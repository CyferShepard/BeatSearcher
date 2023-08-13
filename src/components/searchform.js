import React, {useState} from "react";
import axios from "axios";
import {Form,Row,Col,Button,InputGroup, FormSelect} from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import ResultItem from "./resultItem";
import { difficulty } from "../libs/difficulty";

export default function SearchForm() {
    const [formValues, setFormValues] = useState({});
    const [searchresults,setSearchResults] = useState();
    const [filteredresults,setFilteredResults] = useState();
    const [difficultyFilter, setDifficultyFilter] = useState('All');

    async function beginSearch(event) {
        event.preventDefault();
        if(!formValues.SEARCH_TERM || formValues.SEARCH_TERM.length<3)
        {
            return;
        }

        console.log('Api Hit: '+formValues.SEARCH_TERM);
        await axios
        .get(`https://api.beatsaver.com/search/text/0?sortOrder=Relevance`,
        {
            params: 
            {  
                q:formValues.SEARCH_TERM 
            }
           
        })
        .then((results)=>{

            setSearchResults(results.data?.docs)
            console.log(results.data?.docs);;
            console.log(difficultyFilter);
            if(difficultyFilter!=='All')
              {
                  const filteredData = results.data?.docs.filter(item =>
                      item.versions.some(version =>
                        version.diffs.some(diff => diff.difficulty === difficultyFilter)
                      )
                    );
                    setFilteredResults(filteredData);
              }else{
                  setFilteredResults(results.data?.docs);
              }

        })
        .catch((error) => {
          // let errorMessage= `Error : ${error}`;
        });
    
        // console.log(result.data?.docs);

      
      }
    
      function handleFormChange(event) {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
      }

      function difficultyFilterLogic(_difficulty)
      {
        setDifficultyFilter(_difficulty);
        console.log(difficultyFilter);
        if(_difficulty!=='All')
        {
            const filteredData = searchresults.filter(item =>
                item.versions.some(version =>
                  version.diffs.some(diff => diff.difficulty === _difficulty)
                )
              );
              setFilteredResults(filteredData);
        }else{
            setFilteredResults(searchresults);
        }
     
    
      }
    return (
        <div className="bg-dark text-white">
          <h1 className="my-2">Beat Searcher</h1>

          <div className=" d-flex flex-col justify-content-center text-start pb-4 mb-4">
            <Col className="col-12 w-75">
                <Form onSubmit={beginSearch} as={Row} className="mb-3">
                    <Col className="col-2 m-0 p-0">
                          Song Name
                    </Col>
                    <Col className="col-10 m-0 p-0">
                           <InputGroup>
                                <Form.Control  id="SEARCH_TERM"  name="SEARCH_TERM" value={formValues.SEARCH_TERM||""} onChange={handleFormChange}  />
                                <Button variant="outline-primary" type="button" onClick={beginSearch}><SearchIcon/></Button>
                            </InputGroup>
                    </Col>
                    
                </Form>

                <Row>
                    <Col className="col-2 m-0 p-0">
                          Difficulty
                    </Col>
                    <Col className="col-10 m-0 p-0">
                        <FormSelect  onChange={(e) => difficultyFilterLogic(e.target.value) } className="rounded">
                          {difficulty &&
                                     difficulty.map((difficulty) => (
                                            <option key={difficulty.id} value={difficulty.name}>{difficulty.name}</option>
                                    
                                    ))}
                        </FormSelect>
                    </Col>
                   
                </Row>
            
            </Col>

          </div>




        <div id="ResultItems">
        {filteredresults &&
                         filteredresults.map((resultItem) => (
                            <ResultItem data={resultItem}/>

                        ))}

        </div>

      

        </div>
      );
}