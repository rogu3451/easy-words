import { Component, OnInit } from '@angular/core';
import {WordsService} from '../../services/words.service';
import {WordType} from '../../data/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  word: WordType = null;

  constructor(private wordsService: WordsService) { }

  ngOnInit(): void {
    this.fetchWord();
  }

  addToNouns(word: WordType): void {
    this.wordsService.addNoun(word);
    this.fetchWord(); // get a new word for recognizing
  }

  addToVerbs(word: WordType): void {
    this.wordsService.addVerb(word);
    this.fetchWord(); // get a new word for recognizing
  }

  check(): void{
    this.wordsService.check();
  }

  private fetchWord(): void {
    this.word = this.wordsService.getWords().shift(); // shift() method is getting first element from the list and removes them,
  }

}
