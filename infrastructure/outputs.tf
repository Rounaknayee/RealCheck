output "load_balancer_dns_name" {
  description = "The DNS name of the load balancer"
  value       = aws_lb.realcheck_lb.dns_name

}

output "load_balancer_arn" {
  description = "The ARN of the load balancer"
  value       = aws_lb.realcheck_lb.arn
}


output "vpc_id" {
  value = aws_vpc.realcheck_vpc.id
  description = "The ID of the VPC"
}


output "realcheck_public_subnet_1_id" {
  value = aws_subnet.realcheck_public_subnet_1.id
  description = "The ID of the first public subnet"
}

output "realcheck_public_subnet_2_id" {
  value = aws_subnet.realcheck_public_subnet_2.id
  description = "The ID of the second public subnet"
}

output "ecs_service_security_group_id" {
  value = aws_security_group.ecs_service_security_group.id
  description = "The ID of the ECS service security group"
}