export class Veiculo{

constructor(
    public id: Number,
    public idCliente: Number,
    public modelo: string,
    public anoFabricacao: string,
    public anoModelo: string,
    public idFabricanteVeiculo: Number,
    public cor: string,
    public placa: string,
    public combustivel: string,
) {}


}