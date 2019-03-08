const Generation = require('./generation');
const GenerationTable = require('./table');

class GenerationEngine {
    constructor() {
        this.generation = null;
        this.timer = null;
    }

    start() {
        this.buildNewGeneration();
    }

    stop() {
        clearTimeout(this.timer);
    }

    buildNewGeneration() {
        // this.generation = new Generation(); could be set to bad data because it's being set before storeGeneration().
        //workaround:
        //make a local generation const.
        //store the instance itself
        //if storeGeneration() passes, then
        //set this.generation
        const generation = new Generation();

        GenerationTable.storeGeneration(generation)
            .then(({ generationId }) => {
                //now that storeGeneration passed,
                //set this.generation
                this.generation = generation;
                //update generationId of Generation Class
                this.generation.generationId = generationId;

                console.log('new generation', this.generation);

                this.timer = setTimeout(() => {
                    this.buildNewGeneration();
                }, this.generation.expiration.getTime() - Date.now());
            })
            .catch(err => console.log(err));
    }
}

module.exports = GenerationEngine;
