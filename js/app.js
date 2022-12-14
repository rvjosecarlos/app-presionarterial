document.addEventListener( 'DOMContentLoaded', ()=>{
    // Selectores
    
    const btnNuevo = document.querySelector('#nuevo');
    const btnRegistros = document.querySelector('#registros');
    const btnInformacion = document.querySelector('#informacion');
    const btnVaciar = document.querySelector('#vaciar');

    // Elementos globales
    const seccion = document.querySelector('section');
    const h1 = document.querySelector('H1');
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    // Si carga la app por primera vez
    const form = document.querySelector('form');

    if(form){
        form.addEventListener( 'submit', validarDatos );
    }
    
    // Eventos de los botones
    btnNuevo.addEventListener( 'click', interfazAgregar );
    btnRegistros.addEventListener( 'click', interfazRegistros );
    btnInformacion.addEventListener( 'click', interfazInformacion );
    btnVaciar.addEventListener( 'click', eliminarRegistros );

    //permisoNotificacion();

    // Crea la interfaz para agregar datos de presion
    function interfazAgregar(){
        limpiarHTML(seccion);

        h1.textContent = 'Registro de presión arterial';
        
        const formulario = document.createElement('FORM');
        formulario.id = 'formulario';
        formulario.classList.add('aparecer');
        formulario.addEventListener( 'submit', validarDatos );
        
        const inputEdad = document.createElement('INPUT');
        inputEdad.type = 'number';
        inputEdad.placeholder = 'Ingrese su Edad';
        
        const inputPresion = document.createElement('INPUT');
        inputPresion.type = 'text';
        inputPresion.placeholder = 'Ingrese su Presión. Ejemplo: 120/80';
        
        const registrarBtn = document.createElement('INPUT');
        registrarBtn.type = 'submit';
        registrarBtn.value = 'Registrar medida';
        
        formulario.appendChild(inputEdad);
        formulario.appendChild(inputPresion);
        formulario.appendChild(registrarBtn);
        
        seccion.appendChild(formulario);        

    };

    // Crea la interfaz para mostrar los registros
    function interfazRegistros(e){

        console.log(e.target.value);
        
        // Obten el mes seleccionado
        const mesSelect = e.target.value ? e.target.value : 'Todos' ;       

        limpiarHTML(seccion);

        h1.textContent = 'Historial de mediciones';

        // Crea el select con los meses
        crearMeses();

        // Obten los registros 
        let registros = obtenerRegistros();

        if( mesSelect !== 'Todos' && mesSelect ){

            registros = registros.filter( medicion => medicion.mes === mesSelect );
            console.log(registros);

        };


        if( registros.length === 0 ){ 
            alerta('Aun no hay mediciones registradas');
            return;
        };

        
        
        const divCards = document.createElement('DIV');
        divCards.classList.add('section', 'aparecer'); 

        registros.forEach( medicion =>{

            const { id, sistolica, diastolica, edad, fecha, hora, mes, estado } = medicion;

            const card = document.createElement('DIV');
            card.classList.add('card');

            const edadCard = document.createElement('H2');
            edadCard.textContent = `Persona con edad: ${edad}`;

            const presion = document.createElement('P');
            presion.innerHTML = `Presión: <span id='presion'>${sistolica}/${diastolica}<span>`;

            const fechaCard = document.createElement('P');
            fechaCard.textContent = `Fecha: ${fecha}`;

            const horaCard = document.createElement('P');
            horaCard.textContent = `Hora: ${hora}`;

            const estadoHTML = document.createElement('P');
            estadoHTML.classList.add('estado');
            estadoHTML.textContent = `Estado: ${estado}`;

            const eliminarBtn = document.createElement('A');
            eliminarBtn.classList.add('boton-eliminar');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.dataset.id = id;
            eliminarBtn.onclick = ()=>{
                eliminar(id);
            };

            card.appendChild(edadCard);
            card.appendChild(presion);
            card.appendChild(fechaCard);
            card.appendChild(horaCard);
            card.appendChild(estadoHTML);
            card.appendChild(eliminarBtn);

            divCards.appendChild(card);   
        });

        seccion.appendChild(divCards);
    };

    // Muestra interfaz de informacion de parametros normales de presion
    function interfazInformacion(){
        limpiarHTML(seccion);

        const rangoValores = [
            {
                categoria: 'Óptima',
                sistolica: 'Menor a 120',
                diastolica: 'Menor a 80'
            },
            {
                categoria: 'Normal',
                sistolica: '120-129',
                diastolica: '80-84'
            },
            {
                categoria: 'Normal Alta',
                sistolica: '130-139',
                diastolica: '85-89'

            },
            {
                categoria: 'Hipertensión grado 1',
                sistolica: '140-159',
                diastolica: '90-99'
            },
            {
                categoria: 'Hipertensión grado 2',
                sistolica: '160-179',
                diastolica: '100-109'
            },
            {
                categoria: 'Hipertensión grado 3',
                sistolica: 'Mayor a 180',
                diastolica: 'Mayor a 110'
            },

        ];

        h1.textContent = 'Categorías y rangos de valores';

        rangoValores.forEach( elemento =>{

            const { categoria, sistolica, diastolica } = elemento;
            
            const card = document.createElement('DIV');
            card.classList.add('card', 'info', 'aparecer');

            const h2 = document.createElement('H2');
            h2.textContent = categoria;
            console.log(categoria);

            categoria === 'Óptima' ? h2.classList.add('categoria-optima') : undefined;
            categoria === 'Normal' ? h2.classList.add('categoria-normal') : undefined;
            categoria === 'Normal Alta' ? h2.classList.add('categoria-elevada') : undefined;
            categoria === 'Hipertensión grado 1' ? h2.classList.add('categoria-grado-uno') : undefined;
            categoria === 'Hipertensión grado 2' ? h2.classList.add('categoria-grado-dos') : undefined;
            categoria === 'Hipertensión grado 3' ? h2.classList.add('categoria-grado-tres') : undefined;

            const divTiposPresion = document.createElement('DIV');
            divTiposPresion.classList.add('div-rangos');

            const presionSistolica = document.createElement('P');
            presionSistolica.textContent = 'Sistólica';

            const presionDiastolica = document.createElement('P'); 
            presionDiastolica.textContent = 'Diastólica';

            divTiposPresion.appendChild(presionSistolica);
            divTiposPresion.appendChild(presionDiastolica);

            const divRangos = document.createElement('DIV');
            divRangos.classList.add('div-rangos');

            const presionSistolicaValor = document.createElement('P');
            presionSistolicaValor.textContent = sistolica;

            const presionDiastolicaValor = document.createElement('P');
            presionDiastolicaValor.textContent = diastolica;

            divRangos.appendChild(presionSistolicaValor);
            divRangos.appendChild(presionDiastolicaValor);


            card.appendChild(h2);
            card.appendChild(divTiposPresion);
            card.appendChild(divRangos);

            seccion.appendChild(card);

        })
            

    };   


    // Elimina todos los registros
    function eliminarRegistros(){

        if( confirm('¿Desea eliminar todos los registros de mediciones?') ){
            localStorage.clear();

            limpiarHTML( seccion );
            crearMeses();

            const evento = {
                target: {
                    value: 'Todos'
                }
            }

            interfazRegistros(evento);
        };

    };


    // Valida los datos ingresados por el usuario
    function validarDatos(e){
        e.preventDefault();

        // Expresion regular para validar dato de la presion
        const expReg = /^([0-9]{3})\/([0-9]{2})$/m;

        const edad = document.querySelector('input[type=number]').value;
        const presion = document.querySelector('input[type=text]').value;

        if( edad < 1 || edad > 120 || edad === '' ){
            alerta('Error: la edad debe ser entre 1 - 120 años', 'error');
            return;
        }

        if( expReg.test(presion) ){

            const valores = presion.split('/');
            const sistolica = parseInt(valores[0]);
            const diastolica = parseInt(valores[1]);
            
            if( sistolica <= 30 || diastolica <= 30 || diastolica > 200 || sistolica === '' || diastolica === ''){
                alerta('Error: valores no válidos', 'error');
                return;
            }

            let estado;

            if(( sistolica < 120 ) && ( diastolica < 80 ) ) {
                estado = 'Óptima'; 
            }
            else if (( sistolica >= 120 && sistolica <= 129 ) && ( diastolica >= 80 && diastolica <= 84 )){
                estado = 'Normal';
            }
            else if (( sistolica >= 130 && sistolica <= 139 ) && ( diastolica >= 85 && diastolica <= 89 )){
                estado = 'Normal Alta';
            }
            else if (( sistolica >= 140 && sistolica <= 159 ) && ( diastolica >= 90 && diastolica <= 99 )){
                estado = 'Hipertensión grado 1';
            }
            else if (( sistolica >= 160 && sistolica <= 179 ) && ( diastolica >= 100 && diastolica <= 109 )){
                estado = 'Hipertensión grado 2';
            }
            else if (( sistolica >= 180 ) && ( diastolica >= 110 )){
                estado = 'Hipertensión grado 3'
            }
            else{
                estado = 'Sin categoría, consulte las categorías y rangos de valores' ;
            } 

            
            const fechaObj = new Date();
            const dia = fechaObj.getDate() > 9 ? fechaObj.getDate() : `0${fechaObj.getDate()}` ;
            const mes = fechaObj.getMonth()+1 > 9 ? fechaObj.getMonth()+1 : `0${fechaObj.getMonth()}`;
            const year = fechaObj.getFullYear();
            const hora = fechaObj.getHours() > 9 ? fechaObj.getHours() : `0${fechaObj.getHours()}`;
            const minutes = fechaObj.getMinutes() > 9 ? fechaObj.getMinutes() : `0${fechaObj.getMinutes()}`;

            const datosPresion = {
                id: Date.now(),
                sistolica,
                diastolica,
                edad,
                fecha: `${dia}/${mes}/${year}`,
                hora: `${hora}:${minutes} Hrs`,
                mes: meses[mes-1],
                estado
            };

            console.log(datosPresion);

            agregar(datosPresion);
            return;

        }
        alerta('Error: Los datos deben tener esta forma, ejemplo: "120/80"', 'error');

    };

    // Agrega los datos al localstorage
    function agregar(datosPresion){
        

        let mediciones = JSON.parse(window.localStorage.getItem('mediciones')) || [];
        
        mediciones = [...mediciones, datosPresion];
        
        mediciones = JSON.stringify(mediciones);

        localStorage.setItem('mediciones', mediciones);

        alerta('Datos registrados correctamente');
        creaNotificacion('Ver mi historial de medidas...');
        
        document.querySelector('#formulario').reset();

    };

    // Obtener los datos del localStorage
    function obtenerRegistros(){

        return JSON.parse(localStorage.getItem('mediciones')) || [];

    };

    // Emite alerta
    function alerta( mensaje, tipo ){


        const alertaHTML = document.createElement('P');
        alertaHTML.classList.add('aparecer', 'alerta');
        alertaHTML.textContent = mensaje;
        
        if( tipo === 'error' ){
            alertaHTML.classList.add('alerta-bg-red');
        }
        else{
            alertaHTML.classList.add('alerta-bg-green');
        };

        seccion.appendChild( alertaHTML );

        setTimeout(()=>{
            alertaHTML.remove();
        }, 3000);

        
    };

    // Eliminar datos del localStorage
    function eliminar(id){

        

        if(confirm('¿Desea eliminar el registro?')){

            const registros = obtenerRegistros();

            const registrosFiltrados = JSON.stringify(registros.filter( medicion => medicion.id !== id ));

            localStorage.setItem( 'mediciones', registrosFiltrados );

            limpiarHTML( seccion );
            crearMeses();

            const evento = {
                target: {
                    value: 'Todos'
                }
            }

            interfazRegistros(evento);
        }

    };

    // Crea select de meses
    function crearMeses(){

        const mesesSelect = document.createElement('SELECT');
        mesesSelect.classList.add('select-meses');
        const opcion = document.createElement('OPTION');
        opcion.value = 'Seleccionar';
        opcion.textContent = 'Seleccionar';
        console.log(opcion);
        mesesSelect.appendChild(opcion);

        for( let i = 0; i <= 11; i++){
            const opcion = document.createElement('OPTION');
            opcion.value = meses[i];
            opcion.textContent = meses[i];
            mesesSelect.appendChild(opcion);
        }

        const opcionTodas = document.createElement('OPTION');
        opcionTodas.value = 'Todos';
        opcionTodas.textContent = 'Todos';
        mesesSelect.appendChild(opcionTodas);

        seccion.appendChild(mesesSelect);

        mesesSelect.addEventListener( 'change', interfazRegistros );
    };

    // Limpia el HTML
    function limpiarHTML(elemento){
        while( elemento.firstElementChild ){
            elemento.firstElementChild.remove();
        };
    };

    // Solicita permiso para notificar
    function permisoNotificacion(){

        const solicitud = Notification.requestPermission(); 
        
        solicitud.then((respuesta)=>{
            console.log(respuesta);
        });

    };

    // Crea la notificacion
    function creaNotificacion(mensaje){

        if( Notification.permission === 'granted' ){

            const notificacion = new Notification( 'Presión arterial', {
                body: mensaje,
                icon: '../icons/corazon.png'
            });

            const evento = {
                target: {
                    value: 'Todos'
                }
            }

            notificacion.onclick = ()=>{
                interfazRegistros(evento);
            };

        }

    }


});
