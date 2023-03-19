import { Request, Response } from "express";
import { ClaimsService } from "../services/claims_service";
import formidable from "formidable";
import { readFile } from "fs/promises";
import fetch from "cross-fetch";

export class ClaimsController {
    constructor(private claimsService: ClaimsService) {}

    
    createClaims = async (req: Request, res: Response) => {
        const { car_id, descriptions, accident_date} = req.body;
        if (!car_id || !descriptions || !accident_date) {
            res.status(400).json({ message: "invalid input" });
            return;
          }
        const customer_id= req.session.customer_id!
        const claims = await this.claimsService.createClaims(
            customer_id,
            car_id,
            descriptions,
            accident_date
        );
        console.log(claims);
        res.status(201).json({message: "Customer create claim success"});
    };


    getMyClaims = async (req: Request, res: Response) => {

         const customer_id = req.session.customer_id!;
        if (isNaN(customer_id)) {
            res.status(400).json({ message: "invalid customer id" });
            return;
        };
        const claims = await this.claimsService.getMyClaims(customer_id);
        res.json(claims);
    }

    date = async (req:Request,res:Response) => {
        const agent_id = req.session.agent_id!
        const details = await this.claimsService.getClaimsDate(agent_id)
        res.json(details)
    }
    getTheirClaims = async (req:Request,res:Response) => {
        const agent_id = req.session.agent_id!
        const details = await this.claimsService.getTheirClaims(agent_id)
        res.json(details)
    }

    createPartandDamage = async (req:Request,res:Response) => {
        // console.log(req.form.files);
        // read image & convert to base64
        const content = await readFile((req.form.files["image"] as formidable.File).filepath, {encoding: "base64",});
        console.log(content);
        const resp = await fetch("http://localhost:8000/image-classifier", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ image: content }),
        });
        const data = await resp.json();
        console.log(data);
        
        const part = data.car_part_result;
        // console.log(`part: ${part}`);
        const damage = data.damage_level_result;
        // console.log(`damage: ${damage}`);
        const form_claim_id = req.form.fields["claim_id"] as string;
        const claim_id = parseInt(form_claim_id);
        const part_result = await this.claimsService.createCarPart(
            part,
            claim_id
        );
        const damage_result = await this.claimsService.createDamageLevel(
            damage,
            claim_id
        );
        console.log(part_result, damage_result);
        res.status(201).json({message: "Customer uploaded image success!!"});
        // res.json(data);
    }


    getAgentName = async (req: Request, res: Response) => {

        const customer_id = req.session.customer_id!;
       if (isNaN(customer_id)) {
           res.status(400).json({ message: "invalid customer id" });
           return;
       };
       const agent_name = await this.claimsService.getAgentName(customer_id);
    //    console.log(agent_name);
    //    console.log(agent_name[0].name);
       res.json(agent_name);
   }

};