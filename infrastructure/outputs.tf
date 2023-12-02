# Output for EKS Cluster ID
output "cluster_id" {
  value       = aws_eks_cluster.realcheck_cluster.id
  description = "EKS Cluster ID"
}

# Output for EKS Cluster Endpoint
output "cluster_endpoint" {
  value       = aws_eks_cluster.realcheck_cluster.endpoint
  description = "EKS Cluster Endpoint"
}

# Output for VPC ID
output "vpc_id" {
  value       = aws_vpc.realcheck_vpc.id
  description = "VPC ID"
}

# Output for Subnet1 ID
output "subnet1_id" {
  value       = aws_subnet.realcheck_subnet1.id
  description = "Subnet1 ID"
}

# Output for Subnet2 ID
output "subnet2_id" {
  value       = aws_subnet.realcheck_subnet2.id
  description = "Subnet2 ID"
}

# Output for EKS Node Group Name
output "node_group_name" {
  value       = aws_eks_node_group.realcheck_node_group.node_group_name
  description = "EKS Node Group Name"
}

# Output for EKS Node Group ARN
output "node_group_arn" {
  value       = aws_eks_node_group.realcheck_node_group.arn
  description = "EKS Node Group ARN"
}

# Output for EKS Node Group Status
output "node_group_status" {
  value       = aws_eks_node_group.realcheck_node_group.status
  description = "EKS Node Group Status"
}
