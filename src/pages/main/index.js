import React, {Component} from "react";
import api from "../../services/api";
import './styles.css';
import {Link} from'react-router-dom';

export default class Main extends Component{
    //variaveis de estados começam por states 
    state = {
        products:[],
        productInfo:{},
        page: 1,
    }

    //assim que o component e exibido em tela sempre que prescisamos utilizar tal
    // ação utilizamos o metodo - componentDidMount()
    componentDidMount() {
        this.loadProducts();
    }
    // async promisse JS
    loadProducts= async (page = 1) =>{
        const response = await api.get(`/products?page=${page}`);
        //Retorna os produtos que estão na rota passada pelo Insonia
        const { docs, ...productInfo } = response.data;
        this.setState({products:docs, productInfo, page});
    };
    //Funções de Proximo e Anterior entre as paginas 
    prevPage = () =>{
        const {page, productInfo} = this.state;

        if(page ===1)return;
        const pageNumber = page -1;
        this.loadProducts(pageNumber);

    };

    nextPage = () =>{
        const {page, productInfo} = this.state;
        if(page === productInfo.pages) return;
        const pageNumber = page +1;
        this.loadProducts(pageNumber);

    };

    // Sempre que criar uma variavel estado o metodo render tras as alterações dela 
    render() {
        const {products, page, productInfo} = this.state;
        return(
            <div className="product-list">
                {products.map(product =>(
                    <article key = {product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>
                    <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>  
                ))}
                <div className="actions">
                    <button disabled={page ===1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page ===productInfo.pages}onClick={this.nextPage}>Proximo</button>
                </div>

            </div>
        )
    }//<Link> substitui <a> ao clicar e encaminhado para rota passada no routes.js
}

