import React from "react"
import {
  Card
} from "material-ui"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Histogramme = (props) => {
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
              <Tooltip/>
              <Legend />
              <Line name="marque équipe hote" type="monotone" dataKey="marqueHote" stroke="#8884d8" activeDot={{r: 8}}/>
              <Line name="marque équipe visiteur" type="monotone" dataKey="marqueVisiteur" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        }
      </Card>
    )
}

export default Histogramme
