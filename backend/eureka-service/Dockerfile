# Étape 1 : Construire avec Maven
FROM maven:3.9.6-eclipse-temurin-11 AS builder

WORKDIR /app

# Copie le projet eureka-service
COPY . .

# Construis le JAR
RUN mvn clean package -DskipTests

# Étape 2 : Image finale
FROM openjdk:11-slim

WORKDIR /app

# Copie le JAR construit
COPY --from=builder /app/target/eureka-service-0.0.1-SNAPSHOT.jar /app/eureka-service.jar

# Expose le port 8761 (défini dans application.yml)
EXPOSE 8761

# Lance le service
CMD ["java", "-jar", "/app/eureka-service.jar"]
