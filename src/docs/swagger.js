/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - hospitalId
 *         - userType
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         hospitalId:
 *           type: string
 *           description: The id of the hospital
 *         userType:
 *           type: string
 *           description: The userType
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 *         email: johndoe@example.com
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */
