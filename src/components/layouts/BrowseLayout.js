import React from "react"
import { Flex, Button } from "@chakra-ui/core"
import axios from "axios"

//Global Sections
import Header from "../sections/Header"
import Footer from "../sections/Footer"

//Local Sections
import Gallery from "../sections/Gallery"
import Search from "../sections/Search"

export default class BrowseLayout extends React.Component {
  constructor(props){
    super(props)
    this.SubmitForm = this.SubmitForm.bind(this);
    this.PageUp = this.PageUp.bind(this);
    this.state = {
      gridData: '',
      query: '',
      page: 1
    };
  }

  //On initial load, get the standard browse page
  componentDidMount() {
    this.GetResults();
  }

  //Make a request to get the browse data
  GetResults(){
    var baseUrl = `https://theminiindex.com/api/minis/search?pageIndex=${this.state.page}`;
    //var baseUrl = `https://localhost:44386/api/minis/search?pageIndex=${page}`;

    if(this.state.query){
      baseUrl += `&SearchString=${this.state.query}`;
    }

    axios.get(baseUrl)
      .then(({ data }) => {
          if(this.state.page>1){
            this.setState({gridData:this.state.gridData.concat(data)})
          }else{
            this.setState({gridData:data});
          }
      })
  }
  
  SubmitForm(newSearch){
    this.setState({
        query: newSearch,
        page:1,
        gridData:''
      },
      function(){
        this.GetResults();
      }
    );
  };

  PageUp(){
    this.setState({page: parseInt(this.state.page)+1}, function(){
      this.GetResults();
    });
  };  

  render() {
    const query=this.state.query;

    return(
        <>
            <Header />
            <Flex
                direction={{ base: "column", lg: "column" }}
                align="top"
                justify="center"
            >
                <Search
                    w={{ base: "100%"}}
                    query={query}
                    onSearchChange={this.SubmitForm}
                />
                <Gallery
                    w={{ base: "100%", lg: "80%" }}
                    gridData={this.state.gridData}
                />
                <div align="center">
                    <Button onClick={this.PageUp} m={4} w={"80%"}>
                        Load more...
                    </Button>
                </div>
            </Flex>
            <Footer />
        </>
    )
  }
}