variable "aws_region" {
  default = "us-east-1"
  description = "value of the region where the resources will be created"
  type = string
}

variable "common_tags" {
  type = map(string)
  default = {
    Project = "RealCheck"
  }
  description = "Common tags to be applied to all resources"
}