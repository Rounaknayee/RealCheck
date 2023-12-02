# Creating EKS cluster, Policies and node groups

resource "aws_eks_cluster" "realcheck_cluster" {
  name     = "RealCheck_EKS_Cluster"
  role_arn = aws_iam_role.realcheck_eks_cluster_role.arn

  vpc_config {
    subnet_ids         = [aws_subnet.realcheck_subnet1.id, aws_subnet.realcheck_subnet2.id]
    security_group_ids = [aws_security_group.realcheck_eks_cluster_sg.id]
  }

  depends_on = [
    aws_iam_role_policy_attachment.realcheck_eks_cluster_policy_attachment,
    aws_iam_role_policy_attachment.realcheck_eks_cni_policy_attachment,
  ]
}

# Creating IAM role for EKS cluster
resource "aws_iam_role" "realcheck_eks_cluster_role" {
  name = "RealCheck_EKS_Cluster_Role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "eks.amazonaws.com"
        },
        Effect = "Allow",
        Sid = ""
      }
    ]
  })
}

# Attaching policies to the role
resource "aws_iam_role_policy_attachment" "realcheck_eks_cluster_policy_attachment" {
  role       = aws_iam_role.realcheck_eks_cluster_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

# Attaching policies to the role
resource "aws_iam_role_policy_attachment" "realcheck_eks_cni_policy_attachment" {
  role       = aws_iam_role.realcheck_eks_cluster_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

# Creating EKS node group
resource "aws_eks_node_group" "realcheck_node_group" {
  cluster_name    = aws_eks_cluster.realcheck_cluster.name
  node_group_name = "RealCheck_EKS_Node_Group"
  node_role_arn   = aws_iam_role.realcheck_eks_node_role.arn
  subnet_ids = [aws_subnet.realcheck_subnet1.id, aws_subnet.realcheck_subnet2.id]
  instance_types = ["t2.micro"]

  scaling_config {
    desired_size = 2
    max_size     = 2
    min_size     = 1
  }

  

  depends_on = [
    aws_eks_cluster.realcheck_cluster,
    aws_iam_role_policy_attachment.realcheck_eks_worker_node_policy_attachment,
    aws_iam_role_policy_attachment.realcheck_eks_cni_policy_attachment,
    aws_iam_role.realcheck_eks_node_role,
    aws_subnet.realcheck_subnet1,
    aws_subnet.realcheck_subnet2,
    # Add any security group resources here if they are being used
  ]
}

# Creating IAM role for EKS node group
resource "aws_iam_role" "realcheck_eks_node_role" {
  name = "RealCheck_EKS_Node_Role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "ec2.amazonaws.com"
        },
        Effect = "Allow",
        Sid = ""
      }
    ]
  })
}

# Attaching policies to the role
resource "aws_iam_role_policy_attachment" "realcheck_eks_worker_node_policy_attachment" {
  role       = aws_iam_role.realcheck_eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}
