const pl = require("tau-prolog");
const session = pl.create(1000);
let data;
const show = (x) => {
  console.log(session.format_answer(x));
  /*  data = session.format_answer(x);
  let dataParsed = data.split(",");
  console.log(dataParsed); */ 
};

const s1 = "sintoma2";
const s2 = "sintoma3";
const s3 = "sintoma7";

const program = `
    % Symptom
    sintoma(id(1), nombre(sintoma1)).
    sintoma(id(2), nombre(sintoma2)).
    sintoma(id(3), nombre(sintoma3)).
    sintoma(id(4), nombre(sintoma4)).
    sintoma(id(5), nombre(sintoma5)).
    sintoma(id(6), nombre(sintoma6)).
    sintoma(id(7), nombre(sintoma7)).
    sintoma(id(8), nombre(sintoma8)).
    % Treatment
    tratamiento(id(1), nombre(tratamiento1), descripcion(descripciondetratamiento1)).
    tratamiento(id(2), nombre(tratamiento2), descripcion(descripciondetratamiento2)).
    tratamiento(id(3), nombre(tratamiento3), descripcion(descripciondetratamiento3)).
    tratamiento(id(4), nombre(tratamiento4), descripcion(descripciondetratamiento4)).
    % Diagnostico
    diagnostico(sintoma(1), sintoma(2), sintoma(3), tratamiento(1), nombre(enfermedad1)).
    diagnostico(sintoma(3), sintoma(4), sintoma(5), tratamiento(2), nombre(enfermedad2)).
    diagnostico(sintoma(2), sintoma(3), sintoma(7), tratamiento(3), nombre(enfermedad3)).
    diagnostico(sintoma(2), sintoma(1), sintoma(8), tratamiento(4), nombre(enfermedad4)).
`;

const goal = `
    sintoma(id(IdSintoma1), nombre(${s1})),
    sintoma(id(IdSintoma2), nombre(${s2})),
    sintoma(id(IdSintoma3), nombre(${s3})),
    diagnostico(sintoma(IdSintoma1), sintoma(IdSintoma2), sintoma(IdSintoma3), tratamiento(IdTratamiento), nombre(NombreDiagnostico)),
    tratamiento(id(IdTratamiento), nombre(NombreTratamiento), descripcion(DescripcionTratamiento)).
`;
session.consult(program, {
  success: function () {
    session.query(goal, {
      success: function () {
        session.answers(show);
      },
    });
  },
});
