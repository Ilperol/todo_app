const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createTodo = async (event) => {
  const data = JSON.parse(event.body);

  if (!data.name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'name is required' }),
    };
  }

  const params = {
    TableName: process.env.TODOS_TABLE,
    Item: {
      id: data.id,
      name: data.name,
      checked: false,
      createdAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    console.error("Error adding todo:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create ToDo' }),
    };
  }
};

module.exports.getTodos = async () => {
  const params = {
    TableName: process.env.TODOS_TABLE,
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch ToDos' }),
    };
  }
};

module.exports.updateTodo = async (event) => {
  const data = JSON.parse(event.body);

  if (typeof data.name !== 'string' || typeof data.checked !== 'boolean') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: '"name" must be a string and "checked" must be a boolean' }),
    };
  }

  const params = {
    TableName: process.env.TODOS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: 'set name = :name, checked = :checked',
    ExpressionAttributeValues: {
      ':name': data.name,
      ':checked': data.checked,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.error("Error updating todo:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update ToDo' }),
    };
  }
};

module.exports.deleteTodo = async (event) => {
  const params = {
    TableName: process.env.TODOS_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  try {
    await dynamoDb.delete(params).promise();
    return {
      statusCode: 204,
      body: null,
    };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete ToDo' }),
    };
  }
};
