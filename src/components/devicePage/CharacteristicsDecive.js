const CharacteristicsDecive = ({deviceInfo}) => {
   return(
      <div className="d-flex flex-column mt-3">
         {deviceInfo.map((info, index) => 
            <div 
               key={info.id} 
               style={{background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10}}>
               {info.title}: {info.description}
            </div>
         )}
      </div>
   )
}

export default CharacteristicsDecive