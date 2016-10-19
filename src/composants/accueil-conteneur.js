import React from "react"

export default function (props) {
  let date = new Date()
  let strDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  let strHeure = date.getHours() + ":" + date.getMinutes()
  return (
    <div>
      {props.children}
      <footer>
        <div id="info">
          <span className="date">
            {strDate} {strHeure}
          </span>
        </div>
      </footer>
    </div>
  )
}
