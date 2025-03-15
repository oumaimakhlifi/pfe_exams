# Étape 1 : Construire avec Maven
FROM maven:3.9.6-eclipse-temurin-11 AS builder

WORKDIR /app

# Copie le projet api-gateway-service
COPY . .

# Construis le JAR
RUN mvn clean package -DskipTests

# Étape 2 : Image finale
FROM openjdk:11-slim

WORKDIR /app

# Copie le JAR construit
COPY --from=builder /app/target/api-gateway-service-0.0.1-SNAPSHOT.jar /app/api-gateway-service.jar

# Expose le port 8090 (défini dans application.properties)
EXPOSE 8090

# Lance le service
CMD ["java", "-jar", "/app/api-gateway-service.jar"]
