import { Router } from "express";
import ClientController from "../controllers/ClientController";

import  LeadController from "../controllers/LeadController";

const route = Router();

const leadController = new LeadController()
const clientController = new ClientController()



route.post('/lead/new', leadController.createLead)
route.get('/leads', leadController.getAllLeads)
route.put('/lead/:id', leadController.editLead)
route.delete('/lead/:id', leadController.deleteLead)


route.post('/client/new', clientController.createClient)



export default route