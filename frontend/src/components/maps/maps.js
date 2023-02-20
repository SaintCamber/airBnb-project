
import React from 'react';



export default function Maps(){
   return( <>
              <h1>Planning to add the google maps api to this page to search for near by spots</h1>
              <h2>This will require updating the database probably though since there is not a search feature yet</h2>
              <h3>in order to implement search with out adding one to the database like i think i might have to i could however make a thunk that accepts an argument
                  of say a string that modifies the query to the database to search for say the name of the spot or more likely the city/state right cause that would 
                  make implementing the map make more sense populate the list of spots in x state/y city and then should be able to drop a pin on the google map assuming 
                  valid addresses are enforced, which i honestly don't know how i would do that just yet  </h3>
            </>
)}