import LoginController from "./LoginController.1";

const loginController = new LoginController()

describe('LoginController', () => {
  describe('login()', () => {
    it('should return a 404 if the user is not found', async () => {
      const req = { body: { email: 'notfound@example.com', password: 'password' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await loginController.login(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usúario náo encontrado' });
    });

    it('should return a 401 if the password is incorrect', async () => {
      const req = { body: { email: 'rogerio@designhope.com.br', password: 'incorrect' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };


      await loginController.login(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usúario e ou senha incorretos' });
    });

    it('should return a 200 and the user data if the login is successful', async () => {
      const req = { body: {	
        email: "rogerio@designhope.com.br",
        password : "abc123"
      } };

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
     
      await loginController.login(req as any, res as any);


      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id : "c2f23beb-cfb8-4a1a-9dde-e8e0fe424c3d",
        email : "rogerio@designhope.com.br",
        message: "connected"
      });
      // assuming that login is defined somewhere in scope of test file 
    });  
  });  
});