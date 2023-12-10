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

variable "mongodb_uri" {
  type = string
}

variable "jwt_secret" {
  type = string
}

variable "alchemy_api_key" {
  type = string
}

variable "alchemy_api_url" {
  type = string
}

variable "contract_address" {
  type = string
}
