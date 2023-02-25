pipeline {
    agent any

    stages {
        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t python-container -f ./Dockerfile .  

                    docker build -t nodejs-container -f ./nodejs/Dockerfile . 

                    '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                    sh "docker tag python-container $DOCKER_USERNAME/python-container"
                    sh "docker tag nodejs-container $DOCKER_USERNAME/nodejs-container"
                    sh "docker push $DOCKER_USERNAME/nodejs-container"
                    sh "docker push $DOCKER_USERNAME/python-container"
                }
            }
        }

        stage('Deploy Docker Container') {
            environment {
                REMOTE_HOST = '192.168.0.6'
                REMOTE_USER = 'jenkins'
                PRIVATE_KEY = credentials('jenkins-private-key')
            }

            steps {
                sshagent(['jenkins-private-key']) {
                    sh "ssh -o StrictHostKeyChecking=no -i $PRIVATE_KEY $REMOTE_USER@$REMOTE_HOST 'docker pull $DOCKER_USERNAME/python-container && docker run -d  $DOCKER_USERNAME/python-container'"
                    sh "ssh -o StrictHostKeyChecking=no -i $PRIVATE_KEY $REMOTE_USER@$REMOTE_HOST 'docker pull $DOCKER_USERNAME/nodejs-container && docker run -d  $DOCKER_USERNAME/nodejs-container'"
                }
            }
        }
    }
}
