# Creating a VPC and two subnets in two different availability zones

resource "aws_vpc" "realcheck_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name    = "RealCheckVPC"
  }
}

resource "aws_subnet" "realcheck_subnet1" {
  vpc_id            = aws_vpc.realcheck_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"
  tags = {
    Name    = "RealCheckSubnet1"
  }
}

resource "aws_subnet" "realcheck_subnet2" {
  vpc_id            = aws_vpc.realcheck_vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"
  tags = {
    Name    = "RealCheckSubnet2"
  }
}

resource "aws_security_group" "realcheck_eks_cluster_sg" {
  name        = "RealCheck_EKS_Cluster_SG"
  description = "Security group for EKS Cluster"
  vpc_id      = aws_vpc.realcheck_vpc.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"  # Allow all outbound traffic
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "RealCheckEksClusterSG"
  }
}


resource "aws_security_group" "realcheck_eks_worker_sg" {
  name        = "RealCheck_EKS_Worker_SG"
  description = "Security group for EKS Worker Nodes"
  vpc_id      = aws_vpc.realcheck_vpc.id

  # Allow inbound traffic from the EKS Cluster security group
  ingress {
    from_port   = 1025
    to_port     = 65535
    protocol    = "tcp"
    security_groups = [aws_security_group.realcheck_eks_cluster_sg.id]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "RealCheckEksWorkerSg"
  }
}
