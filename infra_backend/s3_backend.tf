terraform {
    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = "~>5.0"
        }
    }
  
}

provider "aws" {
  region = "us-east-1" 
  default_tags {
    tags = {
      Project = "RealCheck"
    }
  } 
}


resource "aws_s3_bucket" "terraform_state" {
  bucket = "realcheck-terraform-state"
}

resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "terraform_lock" {
  name           = "realcheck-terraform-lock"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}


# resource "aws_s3_bucket_acl" "terraform_state" {
#   bucket = aws_s3_bucket.terraform_state.id
#   acl    = "private"
# }
