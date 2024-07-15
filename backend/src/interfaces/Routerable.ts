import { Router } from "express";

export default interface Routerable {
    getRouter(): Router;
}