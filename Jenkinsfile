pipeline {
    agent any

    tools {
        nodejs 'node23'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Pujitha-Reddy/BookMyShow.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t bookmyshow-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop bookmyshow-container || true
                docker rm bookmyshow-container || true
                docker run -d -p 3000:3000 --name bookmyshow-container bookmyshow-app
                '''
            }
        }
    }
}