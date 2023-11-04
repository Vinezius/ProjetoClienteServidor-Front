import apiProjeto from "../api/api";

export async function buscarDadosUsuario(registro){
    try {
        const response = await apiProjeto.get(`/usuarios/${registro}`);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao buscar dados do usuário",
                success: false});
    }
}

export async function buscarDadosUsuarios(){
    try {
        const response = await apiProjeto.get(`/usuarios`);
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao buscar dados dos usuários",
                success: false});
    }
}

export async function realizarEdicaoUsuario(registro, dadosForm){
    try {
        const response = await apiProjeto.put(`/usuarios/${registro}`, dadosForm);
        return(response.data);
    } catch (error) {
        console.log(error);
        return({ message: "Erro ao editar dados do usuário",
                success: false});
    }
}
export async function realizarExclusaoUsuario(registro,senha){
    try {
        const response = await apiProjeto.delete(`/usuarios/${registro}`, 
        {senha: {senha}});
        
        return(response.data);
    } catch (error) {
        return({ message: "Erro ao excluir",
                success: false});
    }
}