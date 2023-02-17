import { Router } from "express";
import ClientController from "../controllers/ClientController";

import  LeadController from "../controllers/LeadController";
import LoginController from "../controllers/LoginController.1";

const route = Router();

const leadController = new LeadController()
const clientController = new ClientController()

const loginController = new LoginController()


//login
route.post('/login', loginController.login)

//leads
route.post('/lead/new', leadController.createLead)
route.get('/leads', leadController.getAllLeads)
route.put('/lead/:id', leadController.editLead)
route.delete('/lead/:id', leadController.deleteLead)

//client
route.get('/client/leads', leadController.getAllClientLeads)
route.post('/client/new', clientController.createClient)
route.put('/client/forget', clientController.forgetPassword)


export default route