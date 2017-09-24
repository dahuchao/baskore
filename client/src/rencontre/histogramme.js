import React from "react"
import {
  AppBar,
  IconButton,
  Card
} from "material-ui"
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back"
import { 
  ResponsiveContainer, 
  LineChart, 
  Line,
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

const CustomTooltip = (props) => {
  const { active } = props;
  const styleLabel = {
    color:"dark-gray",
    padding:"5px 5px",
    backgroundColor:"white",
    borderStyle:"solid",
    borderWidth:"thin",
    borderColor:"gray"
  };
  const stylePeriode = {
    fontSize:"0.8em",
    margin:"0 0",
    padding:"0 0"
  };
  const styleMarque = {
    margin:"0 0",
    padding:"0 0"
  };
  if (active) {
    const { payload } = props;
    // console.debug(`props ${JSON.stringify(payload)}.`)
    const marqueHote = payload[0].value;
    const marqueVisiteur = payload[1].value;
    const avance = marqueHote-marqueVisiteur;
    const periode = payload[0].payload.periode;
    return (
      <div style={styleLabel}>
        <p style={stylePeriode}>T{periode}</p>
        <p style={styleMarque}>{marqueHote}/{marqueVisiteur} ({avance>0?"+":""}{avance})</p>
      </div>
    )
  }
  return null;
}
const Histogramme = (props) => {
    // console.debug(`props ${JSON.stringify(props)}.`)
    const resultat = props.rencontre.histoMarques;

    return ( 
      <div>
        <AppBar
          title="Histogramme rencontre"
          iconElementLeft={
            <IconButton onClick={props.historique}>
              <NavigationArrowBack />
            </IconButton>
          }
        />
        <Card>
          {
            resultat==null ? 
            <p>La rencontre n'est pas encore commencée.</p>
            :
            <ResponsiveContainer width="90%" height={300}>
              <LineChart 
                data={resultat}
                margin={{top: 25, right: 0, left: 0, bottom: 15}}>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip content={<CustomTooltip />}/>
                <Legend />
                <Line name={props.rencontre.hote.nom} type="monotone" dataKey="marqueHote" stroke="#8884d8" dot={false} />
                <Line name={props.rencontre.visiteur.nom} type="monotone" dataKey="marqueVisiteur" stroke="#82ca9d" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          }
        </Card>
      </div>
    )
}

export default Histogramme
