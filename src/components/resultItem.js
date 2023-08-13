import React, {useState} from "react";
import {Row,Col, Button,Modal} from 'react-bootstrap';
import { difficulty } from "../libs/difficulty";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ResultItem(props) {
    const data=props.data;
    const [isModalOpen, setIsModalOpen] = useState(false);


      const openModal = () => {
        setIsModalOpen(true);
        console.log("open");
        console.log(`https://allpoland.github.io/ArcViewer/?id=${data.id}`);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      }


      return (
        <div className="search-item p-3 m-2 rounded row">
          <Col className="col-auto">
            <img alt="Cover" src={data.versions[0].coverURL} className="cover" width="100" height="100" />
          </Col>
          
          <Col>
          <Row>
                    {data.name}
                </Row>
                <Row>
                    {data.metadata?.levelAuthorName} - {data.createdAt}
                </Row>
                <Row className="d-flex flex-row mt-1">
                    {
                     data.versions[0] && data.versions[0].diffs && data.versions[0].diffs.map((diff)=>(
                        <div className="col col-auto rounded-5 me-2 py-1 px-2" style={{backgroundColor: (difficulty.find(difficulty => difficulty.name===diff.difficulty)?.color)}}>
                            {diff.difficulty}
                        </div>
                     ))
                    }
                </Row>
          </Col>
      
          <Col className="col-auto">
            <Row className="mb-2">
              <Button className="btn-secondary" onClick={openModal}>View</Button>
            </Row>
            <Row className="mb-2">
                    <Button className="btn-secondary" onClick={() => window.open(`beatsaver://${data.id}`, '_blank')}>OneClick Install</Button>
                </Row>
          </Col>
      
          <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Body className="p-0">
        <div className="modal-iframe-container">
          <iframe src={`https://allpoland.github.io/ArcViewer/?id=${data.id}`} title="Modal Content" allow="fullscreen"/>
        </div>
      </Modal.Body>
    </Modal>
        </div>
      );
      
}