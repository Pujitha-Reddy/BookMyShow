# 🎬 BookMyShow DevOps Project

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white" />
  <img src="https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white" />
  <img src="https://img.shields.io/badge/Trivy-1904DA?style=for-the-badge&logo=aquasecurity&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS_ECR-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS_EKS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />
  <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white" />
</p>

---

## 📌 Project Overview

This project demonstrates an **end-to-end DevOps implementation** for a BookMyShow-style web application.

The application was built with **React**, containerized using **Docker**, analyzed using **SonarQube**, scanned using **Trivy**, pushed to **AWS ECR**, deployed to **AWS EKS**, and monitored using **Grafana**.

The goal of this project was to build a practical DevOps pipeline covering:

- source control
- CI/CD
- static code analysis
- image security scanning
- container registry
- Kubernetes deployment
- monitoring

---

## 🧱 Architecture Diagram

```mermaid
flowchart LR
    A[Developer] --> B[GitHub Repository]
    B --> C[Jenkins Pipeline]

    C --> D[Install Dependencies]
    D --> E[SonarQube Analysis]
    E --> F[Docker Build]
    F --> G[Trivy Image Scan]
    G --> H[Push Image to AWS ECR]

    H --> I[AWS EKS Cluster]
    I --> J[Kubernetes Deployment]
    J --> K[Service - LoadBalancer]
    K --> L[BookMyShow App Public URL]

    I --> M[Grafana Monitoring]
    M --> N[Grafana LoadBalancer URL]




