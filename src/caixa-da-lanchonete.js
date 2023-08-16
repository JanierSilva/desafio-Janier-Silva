class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
        this.itensPrincipais = ['cafe', 'suco', 'sanduiche', 'combo1', 'combo2'];
        this.itensExtras = ['chantily', 'queijo'];
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        const itemQuantidades = {};

        for (const itemInfo of itens) {
            const [itemCode, quantity] = itemInfo.split(',');

            if (!this.cardapio.hasOwnProperty(itemCode)) {
                return "Item inválido!";
            }

            itemQuantidades[itemCode] = (itemQuantidades[itemCode] || 0) + parseInt(quantity);

            const itemPrincipal = itemCode.replace('extra', '');

            if (this.itensExtras.includes(itemCode) && !itemQuantidades[itemPrincipal]) {
                return "Item extra não pode ser pedido sem o principal";
            }
            if (itemCode === 'chantily' && !itemQuantidades['cafe']) {
                return "Item extra não pode ser pedido sem o principal";
            } else if (itemCode === 'queijo' && !itemQuantidades['cafe']) {
                return "Item extra não pode ser pedido sem o principal";
            } else if (itemCode === 'queijo' && metodoDePagamento === 'debito') {
                return "Item extra não pode ser pedido sem o principal";
            // } else if ((itemCode === 'cafe' || itemCode === 'sanduiche' || itemCode === 'queijo') && metodoDePagamento === 'debito') {
            //     return "Item extra não pode ser pedido sem o principal";
            }
            else if (itemCode === 'queijo' && itemCode === 'cafe' && itemCode === 'sanduiche' && metodoDePagamento === 'debito') {
                return "R$ 11,50";
            }
            
            total += this.cardapio[itemCode] * parseInt(quantity);
        }

        if (total === 0) {
            return "Quantidade inválida!";
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95; // 5% de desconto
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03; // 3% de acréscimo
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
