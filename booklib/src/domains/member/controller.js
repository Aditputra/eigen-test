const Member = require("./model");

const asyncCatch = require("./../../utils/asyncCatch");

const getMember = asyncCatch(async (_req, res) => {
  /* 	
		#swagger.tags = ['Member']
    #swagger.description = 'Endpoint to get member'
	*/
  const members = await Member.find({});
  return res.respond({
    statusCode: 200,
    message: "Successfully Get Data",
    data: members,
  });
});

const createMember = asyncCatch(async (req, res) => {
  /* 	
		#swagger.tags = ['Member']
    #swagger.description = 'Endpoint to create member'
	*/

  /*
		#swagger.parameters['obj'] = {
      in: 'body',
      description: 'Create new member',
      required: true,
      schema: { $ref: "#/definitions/createMember" }
    } 
	*/
  const member = await Member.create(req.body);
  return res.respond({
    statusCode: 200,
    message: "Successfully Add Data",
    data: member,
  });
});

module.exports = { getMember, createMember };
