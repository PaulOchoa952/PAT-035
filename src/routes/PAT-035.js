const express = require('express');
const router = express.Router();
const {isLoggedIn} =require('../lib/auth');

const pool = require('../database');
const helpers = require('../lib/helpers');
const handlebars = require('handlebars');

handlebars.registerHelper('times', function(n, block) {
  let accum = '';
  for (let i = 0; i < n; ++i) {
    accum += block.fn(i);
  }
  return accum;
});

handlebars.registerHelper('eq', function(a, b) {
    return a === b;
  });
  

router.get('/home',isLoggedIn,async (req, res) => {
   
    const hotel = await pool.query('SELECT * FROM hotel WHERE id = ?', req.user.id);
    const EncuestaActiva = await pool.query('SELECT * FROM encuesta WHERE idhotel = ? AND estatus = 0', req.user.id);
    if (EncuestaActiva.length>0){
   
    let respuestas = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva[0].idEncuesta);

    respuestas=helpers.cambioArray(respuestas);         
    let total = helpers.total(respuestas);
    const general = helpers.general(total);
    let prom = helpers.promedioGeneral(total);
    let accionGen = helpers.accionGen(prom);
    let estadogen = helpers.estadoGen(prom);
    let colorGen = helpers.colorGen(prom);
    let totalCat1 = helpers.totalCAT1(respuestas);
    let totalCat2 = helpers.totalCAT2(respuestas);
    let totalCat3 = helpers.totalCAT3(respuestas);
    let totalCat4 = helpers.totalCAT4(respuestas);
    let cat1 = helpers.CAT1(totalCat1);
    let cat2 = helpers.CAT2(totalCat2);
    let cat3 = helpers.CAT3(totalCat3);
    let cat4 = helpers.CAT3(totalCat4);
   
    
    
    res.render('PAT-035/home', {hotel: hotel[0],general,accionGen,estadogen,colorGen,cat1,cat2,cat3,cat4});
    }else{
        res.render('PAT-035/home', {hotel: hotel[0]});
    }
    
});

router.get('/estadisticasGlobales',isLoggedIn,async (req, res) => {
   
    const hotel = await pool.query('SELECT * FROM hotel WHERE id = ?', req.user.id);
    const hotel1 = await pool.query('SELECT * FROM hotel WHERE tipo = 1');
    const hotel2 = await pool.query('SELECT * FROM hotel WHERE tipo = 2');
    const hotel3 = await pool.query('SELECT * FROM hotel WHERE tipo = 3');
    const hotel4 = await pool.query('SELECT * FROM hotel WHERE tipo = 4');
    const hotel5 = await pool.query('SELECT * FROM hotel WHERE tipo = 5');

    
    if(hotel1.length>0 && hotel2.length>0 && hotel3.length>0 && hotel4.length>0 && hotel5.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);        
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);

    }else if(hotel1.length>0 && hotel2.length>0 && hotel3.length>0 && hotel4.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id); 
        
    }else if(hotel1.length>0 && hotel2.length>0 && hotel3.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);

    }else if(hotel1.length>0 && hotel2.length>0 && hotel4.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);

    }else if(hotel1.length>0 && hotel2.length>0 && hotel5.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);

    }else if(hotel1.length>0 && hotel3.length>0 && hotel4.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);

    }else if(hotel1.length>0 && hotel3.length>0 && hotel5.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);

    }else if(hotel1.length>0 && hotel4.length>0 && hotel5.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);

    }else if(hotel2.length>0 && hotel3.length>0 && hotel4.length>0){
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);

    }else if(hotel2.length>0 && hotel3.length>0 && hotel5.length>0){
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);

    }else if(hotel2.length>0 && hotel4.length>0 && hotel5.length>0){
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);

    }else if(hotel3.length>0 && hotel4.length>0 && hotel5.length>0){
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);

    }if(hotel1.length>0 && hotel2.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        if (EncuestaActiva1.length>0 && EncuestaActiva2.length>0){
            let respuestas1 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva1[0].idEncuesta); 
            respuestas1=helpers.cambioArray(respuestas1);         
            let total1 = helpers.total(respuestas1);
            const general1 = helpers.general(total1);
            let prom1 = helpers.promedioGeneral(total1);
            let accionGen1 = helpers.accionGen(prom1);
            let estadogen1 = helpers.estadoGen(prom1);
            let colorGen1 = helpers.colorGen(prom1);
            let totalCat11 = helpers.totalCAT1(respuestas1);
            let totalCat12 = helpers.totalCAT2(respuestas1);
            let totalCat13 = helpers.totalCAT3(respuestas1);
            let totalCat14 = helpers.totalCAT4(respuestas1);
            let cat11 = helpers.CAT1(totalCat11);
            let cat12 = helpers.CAT2(totalCat12);
            let cat13 = helpers.CAT3(totalCat13);
            let cat14 = helpers.CAT4(totalCat14);

            let respuestas2 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva2[0].idEncuesta); 
            respuestas2=helpers.cambioArray(respuestas2);         
            let total2 = helpers.total(respuestas2);
            const general2 = helpers.general(total2);
            let prom2 = helpers.promedioGeneral(total2);
            let accionGen2 = helpers.accionGen(prom2);
            let estadogen2 = helpers.estadoGen(prom2);
            let colorGen2 = helpers.colorGen(prom2);
            let totalCat21 = helpers.totalCAT1(respuestas2);
            let totalCat22 = helpers.totalCAT2(respuestas2);
            let totalCat23 = helpers.totalCAT3(respuestas2);
            let totalCat24 = helpers.totalCAT4(respuestas2);
            let cat21 = helpers.CAT1(totalCat21);
            let cat22 = helpers.CAT2(totalCat22);
            let cat23 = helpers.CAT3(totalCat23);
            let cat24 = helpers.CAT4(totalCat24);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general1,accionGen1,estadogen1,colorGen1,cat11,cat12,cat13,cat14,general2,accionGen2,estadogen2,colorGen2,cat21,cat22,cat23,cat24});
        }else if (EncuestaActiva1.length>0){
            let respuestas1 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva1[0].idEncuesta); 
            respuestas1=helpers.cambioArray(respuestas1);         
            let total1 = helpers.total(respuestas1);
            const general1 = helpers.general(total1);
            let prom1 = helpers.promedioGeneral(total1);
            let accionGen1 = helpers.accionGen(prom1);
            let estadogen1 = helpers.estadoGen(prom1);
            let colorGen1 = helpers.colorGen(prom1);
            let totalCat11 = helpers.totalCAT1(respuestas1);
            let totalCat12 = helpers.totalCAT2(respuestas1);
            let totalCat13 = helpers.totalCAT3(respuestas1);
            let totalCat14 = helpers.totalCAT4(respuestas1);
            let cat11 = helpers.CAT1(totalCat11);
            let cat12 = helpers.CAT2(totalCat12);
            let cat13 = helpers.CAT3(totalCat13);
            let cat14 = helpers.CAT4(totalCat14);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general1,accionGen1,estadogen1,colorGen1,cat11,cat12,cat13,cat14});
        }else if (EncuestaActiva2.length>0){
            let respuestas2 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva2[0].idEncuesta); 
            respuestas2=helpers.cambioArray(respuestas2);         
            let total2 = helpers.total(respuestas2);
            const general2 = helpers.general(total2);
            let prom2 = helpers.promedioGeneral(total2);
            let accionGen2 = helpers.accionGen(prom2);
            let estadogen2 = helpers.estadoGen(prom2);
            let colorGen2 = helpers.colorGen(prom2);
            let totalCat21 = helpers.totalCAT1(respuestas2);
            let totalCat22 = helpers.totalCAT2(respuestas2);
            let totalCat23 = helpers.totalCAT3(respuestas2);
            let totalCat24 = helpers.totalCAT4(respuestas2);
            let cat21 = helpers.CAT1(totalCat21);
            let cat22 = helpers.CAT2(totalCat22);
            let cat23 = helpers.CAT3(totalCat23);
            let cat24 = helpers.CAT4(totalCat24);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general2,accionGen2,estadogen2,colorGen2,cat21,cat22,cat23,cat24});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel1.length>0 && hotel3.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        if (EncuestaActiva1.length>0 && EncuestaActiva3.length>0){
            let respuestas1 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva1[0].idEncuesta); 
            respuestas1=helpers.cambioArray(respuestas1);         
            let total1 = helpers.total(respuestas1);
            const general1 = helpers.general(total1);
            let prom1 = helpers.promedioGeneral(total1);
            let accionGen1 = helpers.accionGen(prom1);
            let estadogen1 = helpers.estadoGen(prom1);
            let colorGen1 = helpers.colorGen(prom1);
            let totalCat11 = helpers.totalCAT1(respuestas1);
            let totalCat12 = helpers.totalCAT2(respuestas1);
            let totalCat13 = helpers.totalCAT3(respuestas1);
            let totalCat14 = helpers.totalCAT4(respuestas1);
            let cat11 = helpers.CAT1(totalCat11);
            let cat12 = helpers.CAT2(totalCat12);
            let cat13 = helpers.CAT3(totalCat13);
            let cat14 = helpers.CAT4(totalCat14);

            let respuestas3 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva3[0].idEncuesta); 
            respuestas3=helpers.cambioArray(respuestas3);         
            let total3 = helpers.total(respuestas3);
            const general3 = helpers.general(total3);
            let prom3 = helpers.promedioGeneral(total3);
            let accionGen3 = helpers.accionGen(prom3);
            let estadogen3 = helpers.estadoGen(prom3);
            let colorGen3 = helpers.colorGen(prom3);
            let totalCat31 = helpers.totalCAT1(respuestas3);
            let totalCat32 = helpers.totalCAT2(respuestas3);
            let totalCat33 = helpers.totalCAT3(respuestas3);
            let totalCat34 = helpers.totalCAT4(respuestas3);
            let cat31 = helpers.CAT1(totalCat31);
            let cat32 = helpers.CAT2(totalCat32);
            let cat33 = helpers.CAT3(totalCat33);
            let cat34 = helpers.CAT4(totalCat34);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general1,accionGen1,estadogen1,colorGen1,cat11,cat12,cat13,cat14,general3,accionGen3,estadogen3,colorGen3,cat31,cat32,cat33,cat34});
        }else if (EncuestaActiva1.length>0){
            let respuestas1 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva1[0].idEncuesta); 
            respuestas1=helpers.cambioArray(respuestas1);         
            let total1 = helpers.total(respuestas1);
            const general1 = helpers.general(total1);
            let prom1 = helpers.promedioGeneral(total1);
            let accionGen1 = helpers.accionGen(prom1);
            let estadogen1 = helpers.estadoGen(prom1);
            let colorGen1 = helpers.colorGen(prom1);
            let totalCat11 = helpers.totalCAT1(respuestas1);
            let totalCat12 = helpers.totalCAT2(respuestas1);
            let totalCat13 = helpers.totalCAT3(respuestas1);
            let totalCat14 = helpers.totalCAT4(respuestas1);
            let cat11 = helpers.CAT1(totalCat11);
            let cat12 = helpers.CAT2(totalCat12);
            let cat13 = helpers.CAT3(totalCat13);
            let cat14 = helpers.CAT4(totalCat14);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general1,accionGen1,estadogen1,colorGen1,cat11,cat12,cat13,cat14});
        }else if (EncuestaActiva3.length>0){
            let respuestas3 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva3[0].idEncuesta); 
            respuestas3=helpers.cambioArray(respuestas3);         
            let total3 = helpers.total(respuestas3);
            const general3 = helpers.general(total3);
            let prom3 = helpers.promedioGeneral(total3);
            let accionGen3 = helpers.accionGen(prom3);
            let estadogen3 = helpers.estadoGen(prom3);
            let colorGen3 = helpers.colorGen(prom3);
            let totalCat31 = helpers.totalCAT1(respuestas3);
            let totalCat32 = helpers.totalCAT2(respuestas3);
            let totalCat33 = helpers.totalCAT3(respuestas3);
            let totalCat34 = helpers.totalCAT4(respuestas3);
            let cat31 = helpers.CAT1(totalCat31);
            let cat32 = helpers.CAT2(totalCat32);
            let cat33 = helpers.CAT3(totalCat33);
            let cat34 = helpers.CAT4(totalCat34);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general3,accionGen3,estadogen3,colorGen3,cat31,cat32,cat33,cat34});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel1.length>0 && hotel4.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);
        if (EncuestaActiva1.length>0 && EncuestaActiva4.length>0){
            let respuestas1 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva1[0].idEncuesta); 
            respuestas1=helpers.cambioArray(respuestas1);         
            let total1 = helpers.total(respuestas1);
            const general1 = helpers.general(total1);
            let prom1 = helpers.promedioGeneral(total1);
            let accionGen1 = helpers.accionGen(prom1);
            let estadogen1 = helpers.estadoGen(prom1);
            let colorGen1 = helpers.colorGen(prom1);
            let totalCat11 = helpers.totalCAT1(respuestas1);
            let totalCat12 = helpers.totalCAT2(respuestas1);
            let totalCat13 = helpers.totalCAT3(respuestas1);
            let totalCat14 = helpers.totalCAT4(respuestas1);
            let cat11 = helpers.CAT1(totalCat11);
            let cat12 = helpers.CAT2(totalCat12);
            let cat13 = helpers.CAT3(totalCat13);
            let cat14 = helpers.CAT4(totalCat14);
            
            let respuestas4 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva4[0].idEncuesta); 
            respuestas4=helpers.cambioArray(respuestas4);         
            let total4 = helpers.total(respuestas4);
            const general4 = helpers.general(total4);
            let prom4 = helpers.promedioGeneral(total4);
            let accionGen4 = helpers.accionGen(prom4);
            let estadogen4 = helpers.estadoGen(prom4);
            let colorGen4 = helpers.colorGen(prom4);
            let totalCat41 = helpers.totalCAT1(respuestas4);
            let totalCat42 = helpers.totalCAT2(respuestas4);
            let totalCat43 = helpers.totalCAT3(respuestas4);
            let totalCat44 = helpers.totalCAT4(respuestas4);
            let cat41 = helpers.CAT1(totalCat41);
            let cat42 = helpers.CAT2(totalCat42);
            let cat43 = helpers.CAT3(totalCat43);
            let cat44 = helpers.CAT4(totalCat44);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general1,accionGen1,estadogen1,colorGen1,cat11,cat12,cat13,cat14,general4,accionGen4,estadogen4,colorGen4,cat41,cat42,cat43,cat44});
        }else if (EncuestaActiva1.length>0){
            let respuestas1 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva1[0].idEncuesta); 
            respuestas1=helpers.cambioArray(respuestas1);         
            let total1 = helpers.total(respuestas1);
            const general1 = helpers.general(total1);
            let prom1 = helpers.promedioGeneral(total1);
            let accionGen1 = helpers.accionGen(prom1);
            let estadogen1 = helpers.estadoGen(prom1);
            let colorGen1 = helpers.colorGen(prom1);
            let totalCat11 = helpers.totalCAT1(respuestas1);
            let totalCat12 = helpers.totalCAT2(respuestas1);
            let totalCat13 = helpers.totalCAT3(respuestas1);
            let totalCat14 = helpers.totalCAT4(respuestas1);
            let cat11 = helpers.CAT1(totalCat11);
            let cat12 = helpers.CAT2(totalCat12);
            let cat13 = helpers.CAT3(totalCat13);
            let cat14 = helpers.CAT4(totalCat14);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general1,accionGen1,estadogen1,colorGen1,cat11,cat12,cat13,cat14});
        }else if (EncuestaActiva4.length>0){
            let respuestas4 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva4[0].idEncuesta); 
            respuestas4=helpers.cambioArray(respuestas4);         
            let total4 = helpers.total(respuestas4);
            const general4 = helpers.general(total4);
            let prom4 = helpers.promedioGeneral(total4);
            let accionGen4 = helpers.accionGen(prom4);
            let estadogen4 = helpers.estadoGen(prom4);
            let colorGen4 = helpers.colorGen(prom4);
            let totalCat41 = helpers.totalCAT1(respuestas4);
            let totalCat42 = helpers.totalCAT2(respuestas4);
            let totalCat43 = helpers.totalCAT3(respuestas4);
            let totalCat44 = helpers.totalCAT4(respuestas4);
            let cat41 = helpers.CAT1(totalCat41);
            let cat42 = helpers.CAT2(totalCat42);
            let cat43 = helpers.CAT3(totalCat43);
            let cat44 = helpers.CAT4(totalCat44);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general4,accionGen4,estadogen4,colorGen4,cat41,cat42,cat43,cat44});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel1.length>0 && hotel5.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);
        if (EncuestaActiva1.length>0 && EncuestaActiva5.length>0){
            let respuestas1 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva1[0].idEncuesta); 
            respuestas1=helpers.cambioArray(respuestas1);         
            let total1 = helpers.total(respuestas1);
            const general1 = helpers.general(total1);
            let prom1 = helpers.promedioGeneral(total1);
            let accionGen1 = helpers.accionGen(prom1);
            let estadogen1 = helpers.estadoGen(prom1);
            let colorGen1 = helpers.colorGen(prom1);
            let totalCat11 = helpers.totalCAT1(respuestas1);
            let totalCat12 = helpers.totalCAT2(respuestas1);
            let totalCat13 = helpers.totalCAT3(respuestas1);
            let totalCat14 = helpers.totalCAT4(respuestas1);
            let cat11 = helpers.CAT1(totalCat11);
            let cat12 = helpers.CAT2(totalCat12);
            let cat13 = helpers.CAT3(totalCat13);
            let cat14 = helpers.CAT4(totalCat14);

            let respuestas5 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva5[0].idEncuesta); 
            respuestas5=helpers.cambioArray(respuestas5);         
            let total5 = helpers.total(respuestas5);
            const general5 = helpers.general(total5);
            let prom5 = helpers.promedioGeneral(total5);
            let accionGen5 = helpers.accionGen(prom5);
            let estadogen5 = helpers.estadoGen(prom5);
            let colorGen5 = helpers.colorGen(prom5);
            let totalCat51 = helpers.totalCAT1(respuestas5);
            let totalCat52 = helpers.totalCAT2(respuestas5);
            let totalCat53 = helpers.totalCAT3(respuestas5);
            let totalCat54 = helpers.totalCAT4(respuestas5);
            let cat51 = helpers.CAT1(totalCat51);
            let cat52 = helpers.CAT2(totalCat52);
            let cat53 = helpers.CAT3(totalCat53);
            let cat54 = helpers.CAT4(totalCat54);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general1,accionGen1,estadogen1,colorGen1,cat11,cat12,cat13,cat14,general5,accionGen5,estadogen5,colorGen5,cat51,cat52,cat53,cat54});
        }else if (EncuestaActiva1.length>0){
            let respuestas1 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva1[0].idEncuesta); 
            respuestas1=helpers.cambioArray(respuestas1);         
            let total1 = helpers.total(respuestas1);
            const general1 = helpers.general(total1);
            let prom1 = helpers.promedioGeneral(total1);
            let accionGen1 = helpers.accionGen(prom1);
            let estadogen1 = helpers.estadoGen(prom1);
            let colorGen1 = helpers.colorGen(prom1);
            let totalCat11 = helpers.totalCAT1(respuestas1);
            let totalCat12 = helpers.totalCAT2(respuestas1);
            let totalCat13 = helpers.totalCAT3(respuestas1);
            let totalCat14 = helpers.totalCAT4(respuestas1);
            let cat11 = helpers.CAT1(totalCat11);
            let cat12 = helpers.CAT2(totalCat12);
            let cat13 = helpers.CAT3(totalCat13);
            let cat14 = helpers.CAT4(totalCat14);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general1,accionGen1,estadogen1,colorGen1,cat11,cat12,cat13,cat14});
        }else if (EncuestaActiva5.length>0){
            let respuestas5 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva5[0].idEncuesta); 
            respuestas5=helpers.cambioArray(respuestas5);         
            let total5 = helpers.total(respuestas5);
            const general5 = helpers.general(total5);
            let prom5 = helpers.promedioGeneral(total5);
            let accionGen5 = helpers.accionGen(prom5);
            let estadogen5 = helpers.estadoGen(prom5);
            let colorGen5 = helpers.colorGen(prom5);
            let totalCat51 = helpers.totalCAT1(respuestas5);
            let totalCat52 = helpers.totalCAT2(respuestas5);
            let totalCat53 = helpers.totalCAT3(respuestas5);
            let totalCat54 = helpers.totalCAT4(respuestas5);
            let cat51 = helpers.CAT1(totalCat51);
            let cat52 = helpers.CAT2(totalCat52);
            let cat53 = helpers.CAT3(totalCat53);
            let cat54 = helpers.CAT4(totalCat54);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general5,accionGen5,estadogen5,colorGen5,cat51,cat52,cat53,cat54});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel2.length>0 && hotel3.length>0){
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        if (EncuestaActiva2.length>0 && EncuestaActiva3.length>0){
            let respuestas2 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva2[0].idEncuesta); 
            respuestas2=helpers.cambioArray(respuestas2);         
            let total2 = helpers.total(respuestas2);
            const general2 = helpers.general(total2);
            let prom2 = helpers.promedioGeneral(total2);
            let accionGen2 = helpers.accionGen(prom2);
            let estadogen2 = helpers.estadoGen(prom2);
            let colorGen2 = helpers.colorGen(prom2);
            let totalCat21 = helpers.totalCAT1(respuestas2);
            let totalCat22 = helpers.totalCAT2(respuestas2);
            let totalCat23 = helpers.totalCAT3(respuestas2);
            let totalCat24 = helpers.totalCAT4(respuestas2);
            let cat21 = helpers.CAT1(totalCat21);
            let cat22 = helpers.CAT2(totalCat22);
            let cat23 = helpers.CAT3(totalCat23);
            let cat24 = helpers.CAT4(totalCat24);

            let respuestas3 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva3[0].idEncuesta); 
            respuestas3=helpers.cambioArray(respuestas3);         
            let total3 = helpers.total(respuestas3);
            const general3 = helpers.general(total3);
            let prom3 = helpers.promedioGeneral(total3);
            let accionGen3 = helpers.accionGen(prom3);
            let estadogen3 = helpers.estadoGen(prom3);
            let colorGen3 = helpers.colorGen(prom3);
            let totalCat31 = helpers.totalCAT1(respuestas3);
            let totalCat32 = helpers.totalCAT2(respuestas3);
            let totalCat33 = helpers.totalCAT3(respuestas3);
            let totalCat34 = helpers.totalCAT4(respuestas3);
            let cat31 = helpers.CAT1(totalCat31);
            let cat32 = helpers.CAT2(totalCat32);
            let cat33 = helpers.CAT3(totalCat33);
            let cat34 = helpers.CAT4(totalCat34);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general2,accionGen2,estadogen2,colorGen2,cat21,cat22,cat23,cat24,general3,accionGen3,estadogen3,colorGen3,cat31,cat32,cat33,cat34});
        }else if (EncuestaActiva2.length>0){
            let respuestas2 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva2[0].idEncuesta); 
            respuestas2=helpers.cambioArray(respuestas2);         
            let total2 = helpers.total(respuestas2);
            const general2 = helpers.general(total2);
            let prom2 = helpers.promedioGeneral(total2);
            let accionGen2 = helpers.accionGen(prom2);
            let estadogen2 = helpers.estadoGen(prom2);
            let colorGen2 = helpers.colorGen(prom2);
            let totalCat21 = helpers.totalCAT1(respuestas2);
            let totalCat22 = helpers.totalCAT2(respuestas2);
            let totalCat23 = helpers.totalCAT3(respuestas2);
            let totalCat24 = helpers.totalCAT4(respuestas2);
            let cat21 = helpers.CAT1(totalCat21);
            let cat22 = helpers.CAT2(totalCat22);
            let cat23 = helpers.CAT3(totalCat23);
            let cat24 = helpers.CAT4(totalCat24);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general2,accionGen2,estadogen2,colorGen2,cat21,cat22,cat23,cat24});
        }else if (EncuestaActiva3.length>0){
            let respuestas3 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva3[0].idEncuesta); 
            respuestas3=helpers.cambioArray(respuestas3);         
            let total3 = helpers.total(respuestas3);
            const general3 = helpers.general(total3);
            let prom3 = helpers.promedioGeneral(total3);
            let accionGen3 = helpers.accionGen(prom3);
            let estadogen3 = helpers.estadoGen(prom3);
            let colorGen3 = helpers.colorGen(prom3);
            let totalCat31 = helpers.totalCAT1(respuestas3);
            let totalCat32 = helpers.totalCAT2(respuestas3);
            let totalCat33 = helpers.totalCAT3(respuestas3);
            let totalCat34 = helpers.totalCAT4(respuestas3);
            let cat31 = helpers.CAT1(totalCat31);
            let cat32 = helpers.CAT2(totalCat32);
            let cat33 = helpers.CAT3(totalCat33);
            let cat34 = helpers.CAT4(totalCat34);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general3,accionGen3,estadogen3,colorGen3,cat31,cat32,cat33,cat34});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel2.length>0 && hotel4.length>0){
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);
        if (EncuestaActiva2.length>0 && EncuestaActiva4.length>0){
            let respuestas2 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva2[0].idEncuesta); 
            respuestas2=helpers.cambioArray(respuestas2);         
            let total2 = helpers.total(respuestas2);
            const general2 = helpers.general(total2);
            let prom2 = helpers.promedioGeneral(total2);
            let accionGen2 = helpers.accionGen(prom2);
            let estadogen2 = helpers.estadoGen(prom2);
            let colorGen2 = helpers.colorGen(prom2);
            let totalCat21 = helpers.totalCAT1(respuestas2);
            let totalCat22 = helpers.totalCAT2(respuestas2);
            let totalCat23 = helpers.totalCAT3(respuestas2);
            let totalCat24 = helpers.totalCAT4(respuestas2);
            let cat21 = helpers.CAT1(totalCat21);
            let cat22 = helpers.CAT2(totalCat22);
            let cat23 = helpers.CAT3(totalCat23);
            let cat24 = helpers.CAT4(totalCat24);

            let respuestas4 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva4[0].idEncuesta); 
            respuestas4=helpers.cambioArray(respuestas4);         
            let total4 = helpers.total(respuestas4);
            const general4 = helpers.general(total4);
            let prom4 = helpers.promedioGeneral(total4);
            let accionGen4 = helpers.accionGen(prom4);
            let estadogen4 = helpers.estadoGen(prom4);
            let colorGen4 = helpers.colorGen(prom4);
            let totalCat41 = helpers.totalCAT1(respuestas4);
            let totalCat42 = helpers.totalCAT2(respuestas4);
            let totalCat43 = helpers.totalCAT3(respuestas4);
            let totalCat44 = helpers.totalCAT4(respuestas4);
            let cat41 = helpers.CAT1(totalCat41);
            let cat42 = helpers.CAT2(totalCat42);
            let cat43 = helpers.CAT3(totalCat43);
            let cat44 = helpers.CAT4(totalCat44);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general2,accionGen2,estadogen2,colorGen2,cat21,cat22,cat23,cat24,general4,accionGen4,estadogen4,colorGen4,cat41,cat42,cat43,cat44});
        }else if (EncuestaActiva2.length>0){
            let respuestas2 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva2[0].idEncuesta); 
            respuestas2=helpers.cambioArray(respuestas2);         
            let total2 = helpers.total(respuestas2);
            const general2 = helpers.general(total2);
            let prom2 = helpers.promedioGeneral(total2);
            let accionGen2 = helpers.accionGen(prom2);
            let estadogen2 = helpers.estadoGen(prom2);
            let colorGen2 = helpers.colorGen(prom2);
            let totalCat21 = helpers.totalCAT1(respuestas2);
            let totalCat22 = helpers.totalCAT2(respuestas2);
            let totalCat23 = helpers.totalCAT3(respuestas2);
            let totalCat24 = helpers.totalCAT4(respuestas2);
            let cat21 = helpers.CAT1(totalCat21);
            let cat22 = helpers.CAT2(totalCat22);
            let cat23 = helpers.CAT3(totalCat23);
            let cat24 = helpers.CAT4(totalCat24);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general2,accionGen2,estadogen2,colorGen2,cat21,cat22,cat23,cat24});
        }else if (EncuestaActiva4.length>0){
            let respuestas4 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva4[0].idEncuesta); 
            respuestas4=helpers.cambioArray(respuestas4);         
            let total4 = helpers.total(respuestas4);
            const general4 = helpers.general(total4);
            let prom4 = helpers.promedioGeneral(total4);
            let accionGen4 = helpers.accionGen(prom4);
            let estadogen4 = helpers.estadoGen(prom4);
            let colorGen4 = helpers.colorGen(prom4);
            let totalCat41 = helpers.totalCAT1(respuestas4);
            let totalCat42 = helpers.totalCAT2(respuestas4);
            let totalCat43 = helpers.totalCAT3(respuestas4);
            let totalCat44 = helpers.totalCAT4(respuestas4);
            let cat41 = helpers.CAT1(totalCat41);
            let cat42 = helpers.CAT2(totalCat42);
            let cat43 = helpers.CAT3(totalCat43);
            let cat44 = helpers.CAT4(totalCat44);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general4,accionGen4,estadogen4,colorGen4,cat41,cat42,cat43,cat44});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel2.length>0 && hotel5.length>0){
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);
        if (EncuestaActiva2.length>0 && EncuestaActiva5.length>0){
            let respuestas2 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva2[0].idEncuesta); 
            respuestas2=helpers.cambioArray(respuestas2);         
            let total2 = helpers.total(respuestas2);
            const general2 = helpers.general(total2);
            let prom2 = helpers.promedioGeneral(total2);
            let accionGen2 = helpers.accionGen(prom2);
            let estadogen2 = helpers.estadoGen(prom2);
            let colorGen2 = helpers.colorGen(prom2);
            let totalCat21 = helpers.totalCAT1(respuestas2);
            let totalCat22 = helpers.totalCAT2(respuestas2);
            let totalCat23 = helpers.totalCAT3(respuestas2);
            let totalCat24 = helpers.totalCAT4(respuestas2);
            let cat21 = helpers.CAT1(totalCat21);
            let cat22 = helpers.CAT2(totalCat22);
            let cat23 = helpers.CAT3(totalCat23);
            let cat24 = helpers.CAT4(totalCat24);

            let respuestas5 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva5[0].idEncuesta); 
            respuestas5=helpers.cambioArray(respuestas5);         
            let total5 = helpers.total(respuestas5);
            const general5 = helpers.general(total5);
            let prom5 = helpers.promedioGeneral(total5);
            let accionGen5 = helpers.accionGen(prom5);
            let estadogen5 = helpers.estadoGen(prom5);
            let colorGen5 = helpers.colorGen(prom5);
            let totalCat51 = helpers.totalCAT1(respuestas5);
            let totalCat52 = helpers.totalCAT2(respuestas5);
            let totalCat53 = helpers.totalCAT3(respuestas5);
            let totalCat54 = helpers.totalCAT4(respuestas5);
            let cat51 = helpers.CAT1(totalCat51);
            let cat52 = helpers.CAT2(totalCat52);
            let cat53 = helpers.CAT3(totalCat53);
            let cat54 = helpers.CAT4(totalCat54);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general2,accionGen2,estadogen2,colorGen2,cat21,cat22,cat23,cat24,general5,accionGen5,estadogen5,colorGen5,cat51,cat52,cat53,cat54});
        }else if (EncuestaActiva2.length>0){
            let respuestas2 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva2[0].idEncuesta); 
            respuestas2=helpers.cambioArray(respuestas2);         
            let total2 = helpers.total(respuestas2);
            const general2 = helpers.general(total2);
            let prom2 = helpers.promedioGeneral(total2);
            let accionGen2 = helpers.accionGen(prom2);
            let estadogen2 = helpers.estadoGen(prom2);
            let colorGen2 = helpers.colorGen(prom2);
            let totalCat21 = helpers.totalCAT1(respuestas2);
            let totalCat22 = helpers.totalCAT2(respuestas2);
            let totalCat23 = helpers.totalCAT3(respuestas2);
            let totalCat24 = helpers.totalCAT4(respuestas2);
            let cat21 = helpers.CAT1(totalCat21);
            let cat22 = helpers.CAT2(totalCat22);
            let cat23 = helpers.CAT3(totalCat23);
            let cat24 = helpers.CAT4(totalCat24);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general2,accionGen2,estadogen2,colorGen2,cat21,cat22,cat23,cat24});
        }else if (EncuestaActiva5.length>0){
            let respuestas5 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva5[0].idEncuesta); 
            respuestas5=helpers.cambioArray(respuestas5);         
            let total5 = helpers.total(respuestas5);
            const general5 = helpers.general(total5);
            let prom5 = helpers.promedioGeneral(total5);
            let accionGen5 = helpers.accionGen(prom5);
            let estadogen5 = helpers.estadoGen(prom5);
            let colorGen5 = helpers.colorGen(prom5);
            let totalCat51 = helpers.totalCAT1(respuestas5);
            let totalCat52 = helpers.totalCAT2(respuestas5);
            let totalCat53 = helpers.totalCAT3(respuestas5);
            let totalCat54 = helpers.totalCAT4(respuestas5);
            let cat51 = helpers.CAT1(totalCat51);
            let cat52 = helpers.CAT2(totalCat52);
            let cat53 = helpers.CAT3(totalCat53);
            let cat54 = helpers.CAT4(totalCat54);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general5,accionGen5,estadogen5,colorGen5,cat51,cat52,cat53,cat54});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel3.length>0 && hotel4.length>0){
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);
        if (EncuestaActiva3.length>0 && EncuestaActiva4.length>0){
            let respuestas3 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva3[0].idEncuesta); 
            respuestas3=helpers.cambioArray(respuestas3);         
            let total3 = helpers.total(respuestas3);
            const general3 = helpers.general(total3);
            let prom3 = helpers.promedioGeneral(total3);
            let accionGen3 = helpers.accionGen(prom3);
            let estadogen3 = helpers.estadoGen(prom3);
            let colorGen3 = helpers.colorGen(prom3);
            let totalCat31 = helpers.totalCAT1(respuestas3);
            let totalCat32 = helpers.totalCAT2(respuestas3);
            let totalCat33 = helpers.totalCAT3(respuestas3);
            let totalCat34 = helpers.totalCAT4(respuestas3);
            let cat31 = helpers.CAT1(totalCat31);
            let cat32 = helpers.CAT2(totalCat32);
            let cat33 = helpers.CAT3(totalCat33);
            let cat34 = helpers.CAT4(totalCat34);

            let respuestas4 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva4[0].idEncuesta); 
            respuestas4=helpers.cambioArray(respuestas4);         
            let total4 = helpers.total(respuestas4);
            const general4 = helpers.general(total4);
            let prom4 = helpers.promedioGeneral(total4);
            let accionGen4 = helpers.accionGen(prom4);
            let estadogen4 = helpers.estadoGen(prom4);
            let colorGen4 = helpers.colorGen(prom4);
            let totalCat41 = helpers.totalCAT1(respuestas4);
            let totalCat42 = helpers.totalCAT2(respuestas4);
            let totalCat43 = helpers.totalCAT3(respuestas4);
            let totalCat44 = helpers.totalCAT4(respuestas4);
            let cat41 = helpers.CAT1(totalCat41);
            let cat42 = helpers.CAT2(totalCat42);
            let cat43 = helpers.CAT3(totalCat43);
            let cat44 = helpers.CAT4(totalCat44);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general3,accionGen3,estadogen3,colorGen3,cat31,cat32,cat33,cat34,general4,accionGen4,estadogen4,colorGen4,cat41,cat42,cat43,cat44});
        }else if (EncuestaActiva3.length>0){
            let respuestas3 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva3[0].idEncuesta); 
            respuestas3=helpers.cambioArray(respuestas3);         
            let total3 = helpers.total(respuestas3);
            const general3 = helpers.general(total3);
            let prom3 = helpers.promedioGeneral(total3);
            let accionGen3 = helpers.accionGen(prom3);
            let estadogen3 = helpers.estadoGen(prom3);
            let colorGen3 = helpers.colorGen(prom3);
            let totalCat31 = helpers.totalCAT1(respuestas3);
            let totalCat32 = helpers.totalCAT2(respuestas3);
            let totalCat33 = helpers.totalCAT3(respuestas3);
            let totalCat34 = helpers.totalCAT4(respuestas3);
            let cat31 = helpers.CAT1(totalCat31);
            let cat32 = helpers.CAT2(totalCat32);
            let cat33 = helpers.CAT3(totalCat33);
            let cat34 = helpers.CAT4(totalCat34);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general3,accionGen3,estadogen3,colorGen3,cat31,cat32,cat33,cat34});
        }else if (EncuestaActiva4.length>0){
            let respuestas4 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva4[0].idEncuesta); 
            respuestas4=helpers.cambioArray(respuestas4);         
            let total4 = helpers.total(respuestas4);
            const general4 = helpers.general(total4);
            let prom4 = helpers.promedioGeneral(total4);
            let accionGen4 = helpers.accionGen(prom4);
            let estadogen4 = helpers.estadoGen(prom4);
            let colorGen4 = helpers.colorGen(prom4);
            let totalCat41 = helpers.totalCAT1(respuestas4);
            let totalCat42 = helpers.totalCAT2(respuestas4);
            let totalCat43 = helpers.totalCAT3(respuestas4);
            let totalCat44 = helpers.totalCAT4(respuestas4);
            let cat41 = helpers.CAT1(totalCat41);
            let cat42 = helpers.CAT2(totalCat42);
            let cat43 = helpers.CAT3(totalCat43);
            let cat44 = helpers.CAT4(totalCat44);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general4,accionGen4,estadogen4,colorGen4,cat41,cat42,cat43,cat44});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel3.length>0 && hotel5.length>0){
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);
        if (EncuestaActiva3.length>0 && EncuestaActiva5.length>0){
            let respuestas3 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva3[0].idEncuesta); 
            respuestas3=helpers.cambioArray(respuestas3);         
            let total3 = helpers.total(respuestas3);
            const general3 = helpers.general(total3);
            let prom3 = helpers.promedioGeneral(total3);
            let accionGen3 = helpers.accionGen(prom3);
            let estadogen3 = helpers.estadoGen(prom3);
            let colorGen3 = helpers.colorGen(prom3);
            let totalCat31 = helpers.totalCAT1(respuestas3);
            let totalCat32 = helpers.totalCAT2(respuestas3);
            let totalCat33 = helpers.totalCAT3(respuestas3);
            let totalCat34 = helpers.totalCAT4(respuestas3);
            let cat31 = helpers.CAT1(totalCat31);
            let cat32 = helpers.CAT2(totalCat32);
            let cat33 = helpers.CAT3(totalCat33);
            let cat34 = helpers.CAT4(totalCat34);

            let respuestas5 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva5[0].idEncuesta); 
            respuestas5=helpers.cambioArray(respuestas5);         
            let total5 = helpers.total(respuestas5);
            const general5 = helpers.general(total5);
            let prom5 = helpers.promedioGeneral(total5);
            let accionGen5 = helpers.accionGen(prom5);
            let estadogen5 = helpers.estadoGen(prom5);
            let colorGen5 = helpers.colorGen(prom5);
            let totalCat51 = helpers.totalCAT1(respuestas5);
            let totalCat52 = helpers.totalCAT2(respuestas5);
            let totalCat53 = helpers.totalCAT3(respuestas5);
            let totalCat54 = helpers.totalCAT4(respuestas5);
            let cat51 = helpers.CAT1(totalCat51);
            let cat52 = helpers.CAT2(totalCat52);
            let cat53 = helpers.CAT3(totalCat53);
            let cat54 = helpers.CAT4(totalCat54);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general3,accionGen3,estadogen3,colorGen3,cat31,cat32,cat33,cat34,general5,accionGen5,estadogen5,colorGen5,cat51,cat52,cat53,cat54});
        }else if (EncuestaActiva3.length>0){
            let respuestas3 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva3[0].idEncuesta); 
            respuestas3=helpers.cambioArray(respuestas3);         
            let total3 = helpers.total(respuestas3);
            const general3 = helpers.general(total3);
            let prom3 = helpers.promedioGeneral(total3);
            let accionGen3 = helpers.accionGen(prom3);
            let estadogen3 = helpers.estadoGen(prom3);
            let colorGen3 = helpers.colorGen(prom3);
            let totalCat31 = helpers.totalCAT1(respuestas3);
            let totalCat32 = helpers.totalCAT2(respuestas3);
            let totalCat33 = helpers.totalCAT3(respuestas3);
            let totalCat34 = helpers.totalCAT4(respuestas3);
            let cat31 = helpers.CAT1(totalCat31);
            let cat32 = helpers.CAT2(totalCat32);
            let cat33 = helpers.CAT3(totalCat33);
            let cat34 = helpers.CAT4(totalCat34);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general3,accionGen3,estadogen3,colorGen3,cat31,cat32,cat33,cat34});
        }else if (EncuestaActiva5.length>0){
            let respuestas5 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva5[0].idEncuesta); 
            respuestas5=helpers.cambioArray(respuestas5);         
            let total5 = helpers.total(respuestas5);
            const general5 = helpers.general(total5);
            let prom5 = helpers.promedioGeneral(total5);
            let accionGen5 = helpers.accionGen(prom5);
            let estadogen5 = helpers.estadoGen(prom5);
            let colorGen5 = helpers.colorGen(prom5);
            let totalCat51 = helpers.totalCAT1(respuestas5);
            let totalCat52 = helpers.totalCAT2(respuestas5);
            let totalCat53 = helpers.totalCAT3(respuestas5);
            let totalCat54 = helpers.totalCAT4(respuestas5);
            let cat51 = helpers.CAT1(totalCat51);
            let cat52 = helpers.CAT2(totalCat52);
            let cat53 = helpers.CAT3(totalCat53);
            let cat54 = helpers.CAT4(totalCat54);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general5,accionGen5,estadogen5,colorGen5,cat51,cat52,cat53,cat54});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel4.length>0 && hotel5.length>0){
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);
        if (EncuestaActiva4.length>0 && EncuestaActiva5.length>0){
            let respuestas4 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva4[0].idEncuesta); 
            respuestas4=helpers.cambioArray(respuestas4);         
            let total4 = helpers.total(respuestas4);
            const general4 = helpers.general(total4);
            let prom4 = helpers.promedioGeneral(total4);
            let accionGen4 = helpers.accionGen(prom4);
            let estadogen4 = helpers.estadoGen(prom4);
            let colorGen4 = helpers.colorGen(prom4);
            let totalCat41 = helpers.totalCAT1(respuestas4);
            let totalCat42 = helpers.totalCAT2(respuestas4);
            let totalCat43 = helpers.totalCAT3(respuestas4);
            let totalCat44 = helpers.totalCAT4(respuestas4);
            let cat41 = helpers.CAT1(totalCat41);
            let cat42 = helpers.CAT2(totalCat42);
            let cat43 = helpers.CAT3(totalCat43);
            let cat44 = helpers.CAT4(totalCat44);

            let respuestas5 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva5[0].idEncuesta); 
            respuestas5=helpers.cambioArray(respuestas5);         
            let total5 = helpers.total(respuestas5);
            const general5 = helpers.general(total5);
            let prom5 = helpers.promedioGeneral(total5);
            let accionGen5 = helpers.accionGen(prom5);
            let estadogen5 = helpers.estadoGen(prom5);
            let colorGen5 = helpers.colorGen(prom5);
            let totalCat51 = helpers.totalCAT1(respuestas5);
            let totalCat52 = helpers.totalCAT2(respuestas5);
            let totalCat53 = helpers.totalCAT3(respuestas5);
            let totalCat54 = helpers.totalCAT4(respuestas5);
            let cat51 = helpers.CAT1(totalCat51);
            let cat52 = helpers.CAT2(totalCat52);
            let cat53 = helpers.CAT3(totalCat53);
            let cat54 = helpers.CAT4(totalCat54);

            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general4,accionGen4,estadogen4,colorGen4,cat41,cat42,cat43,cat44,general5,accionGen5,estadogen5,colorGen5,cat51,cat52,cat53,cat54});
        }else if (EncuestaActiva4.length>0){
            let respuestas4 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva4[0].idEncuesta); 
            respuestas4=helpers.cambioArray(respuestas4);         
            let total4 = helpers.total(respuestas4);
            const general4 = helpers.general(total4);
            let prom4 = helpers.promedioGeneral(total4);
            let accionGen4 = helpers.accionGen(prom4);
            let estadogen4 = helpers.estadoGen(prom4);
            let colorGen4 = helpers.colorGen(prom4);
            let totalCat41 = helpers.totalCAT1(respuestas4);
            let totalCat42 = helpers.totalCAT2(respuestas4);
            let totalCat43 = helpers.totalCAT3(respuestas4);
            let totalCat44 = helpers.totalCAT4(respuestas4);
            let cat41 = helpers.CAT1(totalCat41);
            let cat42 = helpers.CAT2(totalCat42);
            let cat43 = helpers.CAT3(totalCat43);
            let cat44 = helpers.CAT4(totalCat44);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general4,accionGen4,estadogen4,colorGen4,cat41,cat42,cat43,cat44});
        }else if (EncuestaActiva5.length>0){
            let respuestas5 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva5[0].idEncuesta); 
            respuestas5=helpers.cambioArray(respuestas5);         
            let total5 = helpers.total(respuestas5);
            const general5 = helpers.general(total5);
            let prom5 = helpers.promedioGeneral(total5);
            let accionGen5 = helpers.accionGen(prom5);
            let estadogen5 = helpers.estadoGen(prom5);
            let colorGen5 = helpers.colorGen(prom5);
            let totalCat51 = helpers.totalCAT1(respuestas5);
            let totalCat52 = helpers.totalCAT2(respuestas5);
            let totalCat53 = helpers.totalCAT3(respuestas5);
            let totalCat54 = helpers.totalCAT4(respuestas5);
            let cat51 = helpers.CAT1(totalCat51);
            let cat52 = helpers.CAT2(totalCat52);
            let cat53 = helpers.CAT3(totalCat53);
            let cat54 = helpers.CAT4(totalCat54);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general5,accionGen5,estadogen5,colorGen5,cat51,cat52,cat53,cat54});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel1.length>0){
        const EncuestaActiva1 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel1[0].id);
        if (EncuestaActiva1.length>0){
            let respuestas1 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva1[0].idEncuesta); 
            respuestas1=helpers.cambioArray(respuestas1);         
            let total1 = helpers.total(respuestas1);
            const general1 = helpers.general(total1);
            let prom1 = helpers.promedioGeneral(total1);
            let accionGen1 = helpers.accionGen(prom1);
            let estadogen1 = helpers.estadoGen(prom1);
            let colorGen1 = helpers.colorGen(prom1);
            let totalCat11 = helpers.totalCAT1(respuestas1);
            let totalCat12 = helpers.totalCAT2(respuestas1);
            let totalCat13 = helpers.totalCAT3(respuestas1);
            let totalCat14 = helpers.totalCAT4(respuestas1);
            let cat11 = helpers.CAT1(totalCat11);
            let cat12 = helpers.CAT2(totalCat12);
            let cat13 = helpers.CAT3(totalCat13);
            let cat14 = helpers.CAT4(totalCat14);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general1,accionGen1,estadogen1,colorGen1,cat11,cat12,cat13,cat14});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel2.length>0){
        const EncuestaActiva2 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel2[0].id);
        if (EncuestaActiva2.length>0){
            let respuestas2 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva2[0].idEncuesta); 
            respuestas2=helpers.cambioArray(respuestas2);         
            let total2 = helpers.total(respuestas2);
            const general2 = helpers.general(total2);
            let prom2 = helpers.promedioGeneral(total2);
            let accionGen2 = helpers.accionGen(prom2);
            let estadogen2 = helpers.estadoGen(prom2);
            let colorGen2 = helpers.colorGen(prom2);
            let totalCat21 = helpers.totalCAT1(respuestas2);
            let totalCat22 = helpers.totalCAT2(respuestas2);
            let totalCat23 = helpers.totalCAT3(respuestas2);
            let totalCat24 = helpers.totalCAT4(respuestas2);
            let cat21 = helpers.CAT1(totalCat21);
            let cat22 = helpers.CAT2(totalCat22);
            let cat23 = helpers.CAT3(totalCat23);
            let cat24 = helpers.CAT4(totalCat24);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general2,accionGen2,estadogen2,colorGen2,cat21,cat22,cat23,cat24});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel3.length>0){
        const EncuestaActiva3 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel3[0].id);
        if (EncuestaActiva3.length>0){
            let respuestas3 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva3[0].idEncuesta); 
            respuestas3=helpers.cambioArray(respuestas3);         
            let total3 = helpers.total(respuestas3);
            const general3 = helpers.general(total3);
            let prom3 = helpers.promedioGeneral(total3);
            let accionGen3 = helpers.accionGen(prom3);
            let estadogen3 = helpers.estadoGen(prom3);
            let colorGen3 = helpers.colorGen(prom3);
            let totalCat31 = helpers.totalCAT1(respuestas3);
            let totalCat32 = helpers.totalCAT2(respuestas3);
            let totalCat33 = helpers.totalCAT3(respuestas3);
            let totalCat34 = helpers.totalCAT4(respuestas3);
            let cat31 = helpers.CAT1(totalCat31);
            let cat32 = helpers.CAT2(totalCat32);
            let cat33 = helpers.CAT3(totalCat33);
            let cat34 = helpers.CAT4(totalCat34);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general3,accionGen3,estadogen3,colorGen3,cat31,cat32,cat33,cat34});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel4.length>0){
        const EncuestaActiva4 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel4[0].id);
        if (EncuestaActiva4.length>0){
            let respuestas4 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva4[0].idEncuesta); 
            respuestas4=helpers.cambioArray(respuestas4);         
            let total4 = helpers.total(respuestas4);
            const general4 = helpers.general(total4);
            let prom4 = helpers.promedioGeneral(total4);
            let accionGen4 = helpers.accionGen(prom4);
            let estadogen4 = helpers.estadoGen(prom4);
            let colorGen4 = helpers.colorGen(prom4);
            let totalCat41 = helpers.totalCAT1(respuestas4);
            let totalCat42 = helpers.totalCAT2(respuestas4);
            let totalCat43 = helpers.totalCAT3(respuestas4);
            let totalCat44 = helpers.totalCAT4(respuestas4);
            let cat41 = helpers.CAT1(totalCat41);
            let cat42 = helpers.CAT2(totalCat42);
            let cat43 = helpers.CAT3(totalCat43);
            let cat44 = helpers.CAT4(totalCat44);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general4,accionGen4,estadogen4,colorGen4,cat41,cat42,cat43,cat44});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else if(hotel5.length>0){
        const EncuestaActiva5 = await pool.query('SELECT * FROM encuesta WHERE estatus = 0 AND idHotel = ?',hotel5[0].id);
        if (EncuestaActiva5.length>0){
            let respuestas5 = await pool.query('SELECT * FROM respuestas WHERE idEncuesta = ?', EncuestaActiva5[0].idEncuesta); 
            respuestas5=helpers.cambioArray(respuestas5);         
            let total5 = helpers.total(respuestas5);
            const general5 = helpers.general(total5);
            let prom5 = helpers.promedioGeneral(total5);
            let accionGen5 = helpers.accionGen(prom5);
            let estadogen5 = helpers.estadoGen(prom5);
            let colorGen5 = helpers.colorGen(prom5);
            let totalCat51 = helpers.totalCAT1(respuestas5);
            let totalCat52 = helpers.totalCAT2(respuestas5);
            let totalCat53 = helpers.totalCAT3(respuestas5);
            let totalCat54 = helpers.totalCAT4(respuestas5);
            let cat51 = helpers.CAT1(totalCat51);
            let cat52 = helpers.CAT2(totalCat52);
            let cat53 = helpers.CAT3(totalCat53);
            let cat54 = helpers.CAT4(totalCat54);
            
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0],general5,accionGen5,estadogen5,colorGen5,cat51,cat52,cat53,cat54});
        }else{
            res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
        }
    }else{
        res.render('PAT-035/estadisticasGlobales', {hotel: hotel[0]});
    }
});

router.get('/empleados',isLoggedIn,async (req, res) => {
    const hotel = await pool.query('SELECT * FROM hotel WHERE id = ?', req.user.id);
    const empleados = await pool.query('SELECT * FROM empleado WHERE idhotel = ?', req.user.id);
    const numEncuestas = await pool.query('SELECT COUNT(*) as numEncuestas FROM encuesta WHERE idhotel = ?', req.user.id);
    const EncuestaActiva = await pool.query('SELECT * FROM encuesta WHERE idhotel = ? AND estatus = 0', req.user.id);
    const totalEmpleados = empleados.length;
    const totalRespuestas = await pool.query('SELECT count(*) FROM respuestas AS R INNER JOIN  encuesta AS EN ON EN.idEncuesta= R.idEncuesta AND EN.idHotel= ?', req.user.id); 
    if (EncuestaActiva.length>0){
    const numRespuestas = await pool.query('SELECT COUNT(*) as numRespuestas FROM respuestas WHERE idEncuesta = ?', EncuestaActiva[0].idEncuesta);
    const EmpleadoNoRespondio = await pool.query('SELECT EM.nombre,EM.sexo FROM empleado AS EM LEFT JOIN respuestas AS R ON EM.idEmpleado = R.idEmpleado AND R.idEncuesta = ? WHERE R.idEncuesta IS NULL and EM.idHotel=?', [[EncuestaActiva[0].idEncuesta],req.user.id]);
    EmpleadoNoRespondio.forEach(function(empleado) {
        empleado.fecha = EncuestaActiva[0].fecha;
      });
    
    const completadoPorcentaje = numRespuestas[0].numRespuestas ;
    console.log(EncuestaActiva)
    const noCompletadoPorcentaje = totalEmpleados - completadoPorcentaje;
    console.log(completadoPorcentaje);
    console.log(noCompletadoPorcentaje);

    const telEmpleados = await pool.query('SELECT EM.nombre,EM.telefono,EM.idEmpleado FROM empleado AS EM LEFT JOIN respuestas AS R ON EM.idEmpleado = R.idEmpleado AND R.idEncuesta = ? WHERE R.idEncuesta IS NULL and EM.idHotel=?', [[EncuestaActiva[0].idEncuesta],req.user.id]);
    
    const links = helpers.genLinks(telEmpleados, req.user.id, EncuestaActiva[0].idEncuesta);
    console.log(links);

    res.render('PAT-035/empleados', {hotel: hotel[0], empleados,completadoPorcentaje, noCompletadoPorcentaje, numEncuestas: numEncuestas[0].numEncuestas, totalEmpleados,fecha: EncuestaActiva[0].fecha, EmpleadoNoRespondio, totalRespuestas: totalRespuestas[0]['count(*)'],links});
    }else{
        console.log("entra a esto")
        res.render('PAT-035/empleados', {hotel: hotel[0], empleados, numEncuestas: numEncuestas[0].numEncuestas, totalEmpleados,totalRespuestas: totalRespuestas[0]['count(*)']});
    }
    
});

router.get('/editEmpleado/:idEmpleado',isLoggedIn,async (req, res) => {
    const {idEmpleado} = req.params;
    const empleado = await pool.query('SELECT * FROM empleado WHERE idEmpleado = ?', [idEmpleado]);
    console.log(empleado[0]);
    res.render('PAT-035/editEmpleado', {empleado: empleado[0]});

    
});

router.post('/editEmpleado/:idEmpleado',isLoggedIn,async (req, res) => {
    const {idEmpleado} = req.params;
    const {nombre, telefono, correo,sexo,puesto} = req.body;
    const newEmpleado = {
        nombre,
        telefono,
        correo,
        sexo,
        puesto,
        idhotel: req.user.id
    };
    await pool.query('UPDATE empleado set ? WHERE idEmpleado = ?', [newEmpleado, idEmpleado]);
    req.flash('success', 'Empleado actualizado satisfactoriamente');
    
    res.redirect('/PAT-035/empleados');

    
});


router.post('/addEmpleado', async (req, res) => {
    const {nombre, telefono, correo,sexo,puesto} = req.body;
    const newEmpleado = {
        nombre,
        telefono,
        correo,
        sexo,
        puesto,
        idhotel: req.user.id
    };
    
    await pool.query('INSERT INTO empleado set ?', [newEmpleado]);
    req.flash('success', 'Empleado guardado satisfactoriamente');
    res.redirect('/PAT-035/empleados'); 
});





router.get('/deleteEmpleado/:idEmpleado',async (req, res) => {
    const {idEmpleado} = req.params;
    await pool.query('DELETE FROM empleado WHERE idEmpleado = ?', [idEmpleado]);
    req.flash('success', 'Empleado eliminado satisfactoriamente');
    res.redirect('/PAT-035/empleados');
});

router.get('/profile',isLoggedIn,async (req, res) => {  
    const hotel = await pool.query('SELECT * FROM hotel WHERE id = ?', req.user.id);
    const numEmpleados = await pool.query('SELECT COUNT(*) AS numEmpleados FROM empleado WHERE idhotel = ?', req.user.id);
    console.log(numEmpleados[0]);
    res.render('PAT-035/profile', {hotel: hotel[0], numEmpleados: numEmpleados[0]});
});

router.get('/editProfile',isLoggedIn,async (req, res) => {
    const hotel = await pool.query('SELECT * FROM hotel WHERE id = ?', req.user.id);
    res.render('PAT-035/editProfile', {hotel: hotel[0]});
});
router.post('/editProfile',isLoggedIn,async (req, res) => {
    const {nombre, direccion, telefono, correo,descripcion} = req.body;
    const newHotel = {
        nombre,
        direccion,
        telefono,
        descripcion
    };
    await pool.query('UPDATE hotel set ? WHERE id = ?', [newHotel, req.user.id]);
   
    req.flash('success', 'Perfil actualizado satisfactoriamente');
    res.redirect('/PAT-035/profile');
});

router.get('/reportes',isLoggedIn,async (req, res) => {  
    const hotel = await pool.query('SELECT * FROM hotel WHERE id = ?', req.user.id);
    const numEmpleados = await pool.query('SELECT COUNT(*) AS numEmpleados FROM empleado WHERE idhotel = ?', req.user.id);
    const EncuestaActiva = await pool.query('SELECT * FROM encuesta WHERE idhotel = ? AND estatus = 0', req.user.id);
    
    if (EncuestaActiva.length>0){
    const reporteRespuestas = await pool.query('select  idEncuesta, idEmpleado, fecha from respuestas where  IdEncuesta=?', EncuestaActiva[0].idEncuesta);
    console.log(reporteRespuestas);
    res.render('PAT-035/reportes', {hotel: hotel[0], numEmpleados: numEmpleados[0], reporteRespuestas});
    }else {
        
        res.render('PAT-035/reportes', {hotel: hotel[0], numEmpleados: numEmpleados[0]});

    }
   
});

router.get('/startEncuesta',async (req, res) => {
    const fecha = new Date();
    const newEncuesta = {
        fecha,
        estatus: 0,
        idhotel: req.user.id
    };
    const hayEncuesta = await pool.query('SELECT * FROM encuesta WHERE idhotel = ? AND estatus = 0', req.user.id);
    if(hayEncuesta.length > 0){
        req.flash('message', 'Ya existe una encuesta activa');
        res.redirect('/PAT-035/empleados');

    }else{
        await pool.query('INSERT INTO encuesta set ?', [newEncuesta]);
        req.flash('success', 'Encuesta iniciada satisfactoriamente');
        res.redirect('/PAT-035/empleados');
    }
    
});

router.get('/verEncuesta/:idEncuesta/:idEmpleado',async (req, res) => {
    const respuestas = await pool.query('select * from respuestas where idEmpleado = ? and IdEncuesta=?', [req.params.idEmpleado, req.params.idEncuesta]);
    console.log(respuestas);
    res.render('PAT-035/encuestaReporte', {respuestas : respuestas[0]});
});

router.get('/administrador',async (req, res) => {
    const hoteles = await pool.query('SELECT H.id, H.nombre, H.telefono,HA.correo, H.rfc, H.tipo, HA.estatus FROM hotel AS H INNER JOIN hotel_access AS HA ON H.id = HA.id');
    console.log(hoteles);
    res.render('PAT-035/administrador', {hoteles});
});

router.get('/addHotelAdmin',async (req, res) => {
    
    res.render('PAT-035/addHotelAdmin');
});

router.get('/desactivarHotel/:id',async (req, res) => {
    const {id} = req.params;
    const estado = await pool.query('SELECT estatus FROM hotel_access WHERE id = ?', [id]);
    if (estado[0].estatus == 1){
        await pool.query('UPDATE hotel_access set estatus = 3 WHERE id = ?', [id]);
        req.flash('success', 'Hotel desactivado satisfactoriamente');
        res.redirect('/PAT-035/administrador');
    }else{

    await pool.query('UPDATE hotel_access set estatus = 1 WHERE id = ?', [id]);
    req.flash('success', 'Hotel activado satisfactoriamente');
    res.redirect('/PAT-035/administrador');

    }
});

//lsof -i :4000
//kill -9 PID

module.exports = router;