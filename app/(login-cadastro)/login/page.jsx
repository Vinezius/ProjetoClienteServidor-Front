"use client";

import { Formik, Form, Field } from 'formik';
import { realizarLogin } from '@/app/services/login-cadastro-logout';
import { useRouter } from 'next/navigation';
import md5 from 'md5';
        
const LoginPage = () => {
    const router = useRouter();

    async function handleSubmit(dadosForm) {
        const {registro, senha} = dadosForm;
        const senhaCriptografada = md5(senha);
        const payload = {
            registro,
            senha: senhaCriptografada
        }

        try {
            const response = await realizarLogin(payload);
            if(response.success === true){
                sessionStorage.setItem('userToken', response.token);
                sessionStorage.setItem('registro', registro)
                alert('Login realizado com sucesso!');
                router.push('/home')
            }else{
                alert(response.message);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleIp = (ip) =>{
        sessionStorage.setItem('ip', ip);
    }

    const handlePorta = (porta) =>{
        sessionStorage.setItem('porta', porta);
    }


    return (
        <Formik
            initialValues={{ registro: '', senha: '' }}
            onSubmit={(values) => {handleSubmit(values)}}
        >
            {({ handleChange, handleSubmit }) => (
                <div className='container-formulario'>
                    <Form className='formulario'>
                        <h1 className='titulo'>Fazer login</h1>
                        <div className='campo-formulario'> 
                            <label htmlFor="registro">RA</label>
                            <Field id="registro" name="registro" onChange={handleChange} className="input-formulario" type="number"/>
                        </div>
                        <div className='campo-formulario'> 
                            <label htmlFor="senha">Senha</label>
                            <Field id="senha" name="senha" type="password" onChange={handleChange} className="input-formulario"/>
                        </div>
                        <div className='campo-formulario'> 
                            <label htmlFor="senha">IP de conexão</label>
                            <Field id="ip" name="ip" onChange={e => {handleChange(e); handleIp(e.target.value)}} className="input-formulario"/>
                        </div>
                        <div className='campo-formulario'> 
                            <label htmlFor="senha">Porta</label>
                            <Field id="porta" name="porta" onChange={e => {handleChange(e); handlePorta(e.target.value)}} className="input-formulario"/>
                        </div>
                        <div className='container-botoes'>
                            <button type="submit" className='botao-sucesso'>Entrar</button>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

export default LoginPage;
