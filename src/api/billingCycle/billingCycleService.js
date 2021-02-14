const BillingCycle = require('./billingCycle');
const errorHandler = require('../common/errorHandler');

BillingCycle.methods(['get', 'post', 'put', 'delete']);

BillingCycle.after('post', errorHandler).after('put', errorHandler);

/*
 * Pede para o nodeRestful trazer o objeto que foi atualizado (por padrão ele traz o objeto antigo)
 * Pede para o nodeRestful rodar os validadores tb no update (por padrão ele não roda)
 */

BillingCycle.updateOptions({ new: true, runValidators: true });

/*
 * Chamada de rotas que transcedem a parte RESTFul da app
 *
 */

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.countDocuments((error, value) => {
        if (error) {
            res.status(500).json({ error: [error] });
        }
        res.json({ value });
    });
});

/*
 * Calcula o somatório de todos os Values dos Arrays de Credit e Debt de cada Documento da Collection
 * Ex.:  {
            $project: { name: 1, totalCredits: { $sum: "$credits.value" } }
        }
    Aqui estamos calculando o total do array de créditos (apenas o value que é numérico) e colocando no campo totalCredits
    Como não estamos dando $match, ele retorna um array com {name, totalCredits} para cada documento encontrado (se tiver 3, traz 3)
 *
 * Como queremos trazer o total inteiro dos créditos em um valor único, temos que fazer igual ao que está abaixo no método
 */

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate(
        [{
            $project: { creditsDocument: { $sum: "$credits.value" }, debtsDocument: { $sum: "$debts.value" } }

        },
        {
            $group: { _id: null, allCredits: { $sum: "$creditsDocument" }, allDebts: { $sum: "$debtsDocument" } }

        },
        {
            $project: { _id: 0, allCredits: 1, allDebts: 1 }

        }], (error, result) => {
            if (error) {
                res.status(500).json({ "errors": [error] });
            }
            else {
                res.json(result[0] || {});
            }
        }
    )
});

module.exports = BillingCycle;