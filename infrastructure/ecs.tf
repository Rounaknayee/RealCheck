resource "aws_ecs_cluster" "realcheck_cluster" {
  name = "realcheck_cluster"
  tags = {
    Name = "realcheck_cluster"
  }
}

resource "aws_ecs_task_definition" "realcheck_task_definition" {
  family                   = "realcheck_tasks"
  container_definitions    = jsonencode([
    {
      name           = "realcheck_backend_container"
      image          = "docker.io/rounaknayee/realcheck-backend:latest"
      portMappings = [
        {
          containerPort = 5001
          hostPort      = 5001
          protocol      = "tcp"
        }
      ]
      essential      = true
      memory         = 512
      cpu            = 256
      environment    = [
        { name = "NODE_ENV", value = "development" },
        { name = "MONGODB_URI", value = var.mongodb_uri },
        { name = "PORT", value = "5001" },
        { name = "JWT_SECRET", value = var.jwt_secret },
        { name = "ALCHEMY_API_KEY", value = var.alchemy_api_key },
        { name = "ALCHEMY_API_URL", value = var.alchemy_api_url },
        { name = "CONTRACT_ADDRESS", value = var.contract_address}
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs_task_log_group.name
          awslogs-region        = "us-east-1"
          awslogs-stream-prefix = "realcheck"
        }
      }
    }  
  ])
  

  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  tags = {
    Name = "rc_backend_task_definition"
  }
}

resource "aws_cloudwatch_log_group" "ecs_task_log_group" {
  name = "/realcheck/backend-td-logs"  # The name of your CloudWatch log group
}

resource "aws_ecs_service" "realcheck_service" {
  name            = "realcheck_service"
  cluster         = aws_ecs_cluster.realcheck_cluster.id
  task_definition = aws_ecs_task_definition.realcheck_task_definition.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets         = [aws_subnet.realcheck_public_subnet_1.id, aws_subnet.realcheck_public_subnet_2.id]
    security_groups = [aws_security_group.ecs_service_security_group.id]
    assign_public_ip = true
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.realcheck_target_gp.arn
    container_name   = "realcheck_backend_container"
    container_port   = 5001
  }
  tags = {
    Name = "realcheck_service"
  }
}

resource "aws_lb_target_group" "realcheck_target_gp" {
  name     = "realcheck-target-gp"
  port     = 5001
  protocol = "TCP"
  vpc_id   = aws_vpc.realcheck_vpc.id
  target_type = "ip" 

  health_check {
    
    port                = "traffic-port"
    protocol            = "TCP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    interval            = 30
  }
}

resource "aws_lb" "realcheck_lb" {
  name               = "realcheck-lb"
  internal           = false
  load_balancer_type = "network"
  security_groups    = [aws_security_group.ecs_service_security_group.id]
  subnets            = [aws_subnet.realcheck_public_subnet_1.id, aws_subnet.realcheck_public_subnet_2.id]
  tags = {
    Name = "realcheck_lb"
  }
}

resource "aws_lb_listener" "realcheck_listener" {
  load_balancer_arn = aws_lb.realcheck_lb.arn
  port              = "5001"
  protocol          = "TCP"  # or "HTTPS", "TCP", etc., based on your needs

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.realcheck_target_gp.arn
  }
}


resource "aws_security_group" "ecs_service_security_group" {
  name        = "ecs_service_security_group"
  description = "ECS Service Security Group"
  vpc_id      = aws_vpc.realcheck_vpc.id
  ingress {
    from_port   = 5001
    to_port     = 5001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "ecs_service_security_group"
  }
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecs_task_execution_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}


resource "aws_service_discovery_private_dns_namespace" "sd_namespace" {
  name        = "realcheckSDNamespace"
  description = "Realcheck Service Discovery Namespace"
  vpc         = aws_vpc.realcheck_vpc.id
}

resource "aws_service_discovery_service" "sd_service" {
  name = "backend"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.sd_namespace.id

    dns_records {
      ttl  = 60
      type = "A"
    }
  }

  health_check_custom_config {
    failure_threshold = 1
  }
}
