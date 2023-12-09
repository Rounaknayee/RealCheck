resource "aws_vpc" "realcheck_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = {
    Name = "realcheck_vpc"
  }
}

resource "aws_subnet" "realcheck_public_subnet_1" {
  vpc_id                  = aws_vpc.realcheck_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"
  tags = {
    Name = "realcheck_public_subnet_1"
  }
}

resource "aws_subnet" "realcheck_public_subnet_2" {
  vpc_id                  = aws_vpc.realcheck_vpc.id
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1b"
  tags = {
    Name = "realcheck_public_subnet_2"
  }
}

resource "aws_internet_gateway" "realcheck_igw" {
  vpc_id = aws_vpc.realcheck_vpc.id
  tags = {
    Name = "realcheck_igw"
  }
}

resource "aws_route_table" "realcheck_route_table" {
  vpc_id = aws_vpc.realcheck_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.realcheck_igw.id
  }
  tags = {
    Name = "realcheck_route_table"
  }
}

resource "aws_route_table_association" "realcheck_association_1" {
  subnet_id      = aws_subnet.realcheck_public_subnet_1.id
  route_table_id = aws_route_table.realcheck_route_table.id
}

resource "aws_route_table_association" "realcheck_association_2" {
  subnet_id      = aws_subnet.realcheck_public_subnet_2.id
  route_table_id = aws_route_table.realcheck_route_table.id
}
