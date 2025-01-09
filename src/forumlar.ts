interface ConstructionParams {
    buildingWidth: number;
    buildingLength: number;
    buildingFloor: number;
    constructionRate: number;
}

export class Formular {
    calculateArea({ buildingWidth, buildingLength, buildingFloor }: ConstructionParams) {
        return buildingWidth * buildingLength * buildingFloor;
    }

    calculateCost(params: ConstructionParams) {
        return this.calculateArea(params) * params.constructionRate;
    }
}