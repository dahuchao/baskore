import React from "react"
import {
  Card
} from "material-ui"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
    return (
      <div style={styleLabel}>
        <p style={stylePeriode}>T{payload[0].payload.periode}</p>
        <p style={styleMarque}>{payload[0].value}/{payload[1].value}</p>
      </div>
    )
  }
  return null;
}
const Histogramme = (props) => {
    console.debug(`props ${JSON.stringify(props)}.`)
    const resultat = props.rencontre.histoMarques;

    return (
      <Card>
        {
          resultat==null ? 
          <p>La rencontre n'est pas encore commencée.</p>
          :
          <ResponsiveContainer width="90%" height={300}>
            <LineChart data={resultat}
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
    )
}

export default Histogramme
