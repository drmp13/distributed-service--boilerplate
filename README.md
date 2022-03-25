

# Backend Distributed Service Boilerplate
## Techstack


### Container Platform
**Dependencies:**
|  Dependency Name |  Version |  Description |
|--|--|--|
| docker | 20.10.12 | Docker provides the ability to package and run an application in a loosely isolated environment called a container. The isolation and security allows you to run many containers simultaneously on a given host. |
| docker-compose | 1.29.2 | Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. |

### Hapi Boilerplate
**Dependencies:**
|  Dependency Name |  Version |   Description |
|--|--|--|
| Node.js | 14.10.1 |  Node.js is a platform built for easily building fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices. |
| hapi | 20.2.1 |  An open-source framework for developing scalable web applications. One of the most basic use case of hapi is to build REST APIs. You can build application programming interface (API) servers, websites, and HTTP proxy applications with hapi.js. |
| hapi/glue | 8.0.0 |  Server composer for hapi.js. |
| hapi/inert | 6.0.5 |  Static file and directory handlers for hapi.js. |
| hapi/vision | 6.1.0 |  Template rendering support for hapi.js. |
| hapi/hoek | 9.2.1 |  Utility methods for the hapi ecosystem. |
| hapi/boom | 9.1.4 |  HTTP-friendly error objects. |
| hapi/good | 9.0.1 |  Server and process monitoring plugin. |
| hapi/good-squeeze | 6.0.0 |  Server and process monitoring plugin. |
| hapi/good-console | 9.0.1 |  Server and process monitoring plugin. |
| hapi/jwt | 2.1.0 |  JWT (JSON Web Token) Authentication for the hapi ecosystem. |
| hapi-swagger | 14.2.5 |  Create API Documentation in the hapi ecosystem automatically.  |
| jsonwebtoken | 8.5.1 |  An implementation of JSON Web Tokens in Node.JS Application |
| joi | 17.6.0 |  Schema description language and data validator for JavaScript. |
| confidence | 5.0.1 | Configuration document format, an API, and a foundation for A/B testing. |
| module-alias | 2.2.0 | Create aliases of directories and register custom module paths in NodeJS. |
| dotenv | 16.0.0 | Loads environment variables from .env file. |
| config | 3.3.7 | Configuration control for production node deployments. |
| axios | 0.26.0 | Promise based HTTP client for the browser and node.js |
| sequelize | 6.16.1 | Sequelize is a promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server, Amazon Redshift and Snowflake’s Data Cloud. |
| sequelize-cli | 6.4.1 | The Sequelize CLI |
| pg | 8.7.3 | PostgreSQL client - pure javascript & libpq with the same API |
| mongoose | 6.2.2 | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. |
| mocha | 9.2.0 | Simple & flexible JavaScript test framework for Node.js & The Browser |
| nodemailer | 6.7.2 | Module for Node.js applications to email sending. |
| amqplib | 0.8.0 | An AMQP 0-9-1 (e.g., RabbitMQ) library and client. |
| handlebars | 4.7.7 | Handlebars provides the power necessary to build semantic templates effectively |
| elastic-apm-node | 3.29.0 | The official Elastic APM agent for Node.js |
| nodemon | 2.0.15 | Simple monitor script for use during development of a node.js app |

**Node Information:**
|  Item Name |  Value |   Description |
|--|--|--|
| Host | 127.0.0.1:5000 |  - |
| API Basepoint | https://127.0.0.1:5000 |  - |
| API Documentation | https://127.0.0.1:5000/documentation |  - |
| Example User (username:password) | tester:tester |  Example user from database to get JWT |

### Fastify Boilerplate
**Node Information:**
|  Item Name |  Value |   Description |
|--|--|--|
| Host | 127.0.0.1:5001 |  - |
| API Basepoint | https://127.0.0.1:5001 |  - |
| API Documentation | https://127.0.0.1:5001/documentation |  - |
| Example User (username:password) | tester:tester |  Example user from database to get JWT |

### Dummy Postgres Database 1
**Dependencies:**
|  Dependency Name |  Version |   Description |
|--|--|--|
| postgres | 9.5 |  An object-relational database management system (ORDBMS) with an emphasis on extensibility and standards-compliance. |

**Node Information:**
|  Item Name |  Value |   Description |
|--|--|--|
| Host | 127.0.0.1:5432 |  - |
| Username | database_user |  - |
| Password | database_password |  - |
| Database | main_database |  - |


### Dummy Postgres Database 2
**Dependencies:**
|  Dependency Name |  Version |   Description |
|--|--|--|
| postgres | 9.5 |  An object-relational database management system (ORDBMS) with an emphasis on extensibility and standards-compliance. |

**Node Information:**
|  Item Name |  Value |   Description |
|--|--|--|
| Host | 127.0.0.1:5433 |  - |
| Username | database_user2 |  - |
| Password | database_password2 |  - |
| Database | second_database |  - |

###  MongoDB Database: Mail Log
**Dependencies:**
|  Dependency Name |  Version |   Description |
|--|--|--|
| mongo | 5.0 |  Classified as a NoSQL database program, MongoDB uses JSON-like documents with schemata. |

**Node Information:**
|  Item Name |  Value |   Description |
|--|--|--|
| Host | 127.0.0.1:27017 |  - |
| Username | database_user |  - |
| Password | database_password |  - |
| Database | mail |  - |

### RabbitMQ Message Broker
**Dependencies:**
|  Dependency Name |  Version |   Description |
|--|--|--|
| rabbitmq | 3-management-alpine |  An open source multi-protocol messaging broker. |

**Node Information:**
|  Item Name |  Value |   Description |
|--|--|--|
| API Host | 127.0.0.1:5672 |  - |
| Management Host | 127.0.0.1:15672 |  - |
| Username | mquser |  - |
| Password | mqpassword |  - |

### ELK Stack
**Dependencies:**
|  Dependency Name |  Version |   Description |
|--|--|--|
| elasticsearch | 8.0.0 |  Elasticsearch is a powerful open source search and analytics engine that makes data easy to explore. |
| kibana | 8.0.0 |  Kibana gives shape to any kind of data — structured and unstructured — indexed in Elasticsearch. |
| elastic/apm-server | 7.17.1 |  The APM Server maintained by Elastic |

**Node Information:**
|  Item Name |  Value |   Description |
|--|--|--|
| ELK Cluster | es-docker-cluster |  ELK Cluster Name |
| Elasticsearch Host | 127.0.0.1:9200 |  - |
| Elasticsearch Username | elastic |  - |
| Elasticsearch Password | elastic1234 |  - |
| Kibana Host | 127.0.0.1:5601 |  - |
| Kibana Username | kibana_system |  - |
| Kibana Password | kibana1234 |  - |
| APM-Server Host | 127.0.0.1:8200 |  - |
| APM-Server Token | 123secretTokenAPM |  Secret Token for APM Server Authentication |


## Installation
 1. Clone this repository
 2. Open your terminal
 3. Go to parent directory (where is the <i>docker-compose.yml</i> file located)
 4. Start all services with command `docker-compose up`
 5. Check all application functionality by testing all endpoints in the API documentation (https://127.0.0.1:5000/documentation, https://127.0.0.1:5001/documentation).
 6. You can also monitor application performance through the Kibana Dashboard (http://127.0.0.1:5601) using the following credentials => username: `elastic`, password: `elastic1234`.
