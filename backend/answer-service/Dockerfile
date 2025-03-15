# Étape 1 : Construire common-exam
FROM common-exam AS common-exam-builder

# Étape 2 : Construire common-service
FROM common-service AS common-service-builder

# Étape 3 : Construire common-student
FROM common-student AS common-student-builder

# Étape 4 : Construire answer-service avec les dépendances
FROM maven:3.9.6-eclipse-temurin-11 AS builder

WORKDIR /app

# Copie le projet answer-service
COPY . .

# Copie les JAR des autres projets depuis leurs images
COPY --from=common-exam-builder /app/common-exam.jar /root/.m2/repository/com/microservices/common-exam/0.0.1-SNAPSHOT/common-exam-0.0.1-SNAPSHOT.jar
COPY --from=common-service-builder /app/common-service.jar /root/.m2/repository/com/microservices/common-service/0.0.1-SNAPSHOT/common-service-0.0.1-SNAPSHOT.jar
COPY --from=common-student-builder /app/common-student.jar /root/.m2/repository/com/microservices/common-student/0.0.1-SNAPSHOT/common-student-0.0.1-SNAPSHOT.jar

# Construis answer-service
RUN mvn clean package -DskipTests

# Étape 5 : Image finale
FROM openjdk:11-slim

WORKDIR /app

COPY --from=builder /app/target/answer-service-0.0.1-SNAPSHOT.jar /app/answer-service.jar

EXPOSE 8083

CMD ["java", "-jar", "/app/answer-service.jar"]
