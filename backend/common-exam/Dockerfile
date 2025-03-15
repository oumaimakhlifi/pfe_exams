FROM maven:3.9.6-eclipse-temurin-11 AS builder

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:11-slim

WORKDIR /app

COPY --from=builder /app/target/common-exam-0.0.1-SNAPSHOT.jar /app/common-exam.jar

EXPOSE 8084

CMD ["java", "-jar", "/app/common-exam.jar"]
