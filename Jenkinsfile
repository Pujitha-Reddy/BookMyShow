pipeline {
    agent any

    tools {
        nodejs 'node23'
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
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

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh '''
                    $SCANNER_HOME/bin/sonar-scanner \
                      -Dsonar.projectName=BookMyShow \
                      -Dsonar.projectKey=BookMyShow \
                      -Dsonar.sources=src \
                      -Dsonar.host.url=http://localhost:9000
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t bookmyshow-app .'
            }
        }

        stage('Trivy Scan') {
    steps {
        sh 'trivy image bookmyshow-app'
    }
}

        stage('Run Container') {
    steps {
        sh '''
        docker stop bookmyshow-container || true
        docker rm bookmyshow-container || true
        docker run -d -p 3000:80 --name bookmyshow-container bookmyshow-app
        '''
    }
}
    }
}