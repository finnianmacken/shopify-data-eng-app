I had almost no time for this data engineering challenge, because the early invite messages were sent out on the 25th of April and the final cut-off date was the 29th. I therefore chose to focus on two feature-sets:

1. Adding photos to a database quickly, in a scalable way, and in aggregate
2. Viewing photos added to the database

I implemented these requirements with a React frontend and an AWS backend, using an S3 bucket as a data repository. This has several advantages, but most significantly it results in high availability and concurrency, and is well-suited for hosting large media files like images.

All environment variables are as follows (only available on Notion version of README).

The `.env` file has to be in the project’s root directory, and it must have the exact prefixes shown above to work (`create-react-app` limits the syntax of environment variables to avoid exposure).

Install all project dependencies with `npm install`.

To run the application, navigate to the root directory of the project and type `npm start` into the terminal. This will create a development build which exists at `[localhost:3000](http://localhost:3000)` by default.

There are many, many things that I wish I had time to add before the deadline. Here are the top ones:

- A robust caching system and CDN, probably built with Cloudflare
- A DynamoDB database attached to the S3 bucket which generated queryable metadata programmatically when new information is added into it
- Topic labelling for incoming images using SageMaker and probably the ImageNet classification algorithm
- The integration of pre-signed URIs for data security without the need for a backend.
- Automatic refresh of the application upon
