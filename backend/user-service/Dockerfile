# Étape 1 : Récupérer les dépendances depuis les images existantes
FROM spring-boot-microservices-angular-common-service AS common-service-builder
FROM spring-boot-microservices-angular-common-student AS common-student-builder

# Étape 2 : Construire user-service avec Maven
FROM maven:3.9.6-eclipse-temurin-11 AS builder

WORKDIR /app

# Copie le projet user-service
COPY . .

# Copie les JAR des dépendances dans le dépôt Maven local
COPY --from=common-service-builder /app/common-service.jar /root/.m2/repository/com/microservices/common-service/0.0.1-SNAPSHOT/common-service-0.0.1-SNAPSHOT.jar
COPY --from=common-student-builder /app/common-student.jar /root/.m2/repository/com/microservices/common-student/0.0.1-SNAPSHOT/common-student-0.0.1-SNAPSHOT.jar

# Construis le JAR
RUN mvn clean package -DskipTests

# Étape 3 : Image finale
FROM openjdk:11-slim

WORKDIR /app

# Copie le JAR construit
COPY --from=builder /app/target/user-service-0.0.1-SNAPSHOT.jar /app/user-service.jar

# Expose le port 8080
EXPOSE 8080

# Lance le service
CMD ["java", "-jar", "/app/user-service.jar"]
