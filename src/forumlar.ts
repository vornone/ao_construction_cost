interface ConstructionParams {
    buildingWidth: number;
    buildingLength: number;
    buildingFloor: number;
    constructionRate: number;
}

export class ConstructionCost {
    calculateArea({ buildingWidth, buildingLength, buildingFloor }: ConstructionParams) {
        return buildingWidth * buildingLength * buildingFloor;
    }

    calculateTotalCost(params: ConstructionParams) {
        return this.calculateArea(params) * params.constructionRate;
    }
    
    calculateStructureCost(constructionTotalCost: number, percentage: number) {
        return constructionTotalCost * percentage;
    }
    calculateArchiCost(constructionTotalCost: number,percentage: number) {
        return constructionTotalCost * percentage;
    }
    calculateInteriorCost(constructionTotalCost: number, percentage: number) {
        return constructionTotalCost * percentage;
    }
    calculateMEPCost(constructionTotalCost: number, percentage: number) {
        return constructionTotalCost * percentage;
    }
}

export class DesignCost{
    calculateDesignCost(constructionTotalCost: number) {
        return constructionTotalCost * 0.03;
    }
    calculateEngineerCost(constructionTotalCost: number) {
        return constructionTotalCost * 0.04;
    }
    calculateMEPCost(constructionTotalCost: number) {
        return constructionTotalCost * 0.02;
    }
    totalDesignCost(designCost:number, engineerCost:number, MEPCost:number){
        return designCost+engineerCost+MEPCost;
    }
}

export class TotalCost{
    fullBudgetDesignBuild(constructionCost:number, designCost:number){
        return constructionCost + designCost;
    }
    permitFee(fullBudgetDesignBuild:number){
        return fullBudgetDesignBuild*0.03;
    }
    contingencyCashReserve(fullBudgetDesignBuild:number){
        return fullBudgetDesignBuild*0.05;
    }
}

