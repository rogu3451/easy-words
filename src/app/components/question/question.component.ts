import {Component, OnDestroy, OnInit} from '@angular/core';
import {WordsService} from '../../services/words.service';
import {WordType} from '../../data/models';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  word: WordType = null;
  private words = [];
  private subscription: Subscription;

  constructor(private wordsService: WordsService) { }

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.wordsService.getWords().subscribe((words: WordType[]) => {
      this.words = words;
      this.fetchWord();
    });

  }

  addToNouns(word: WordType): void {
    this.wordsService.addNoun(word);
    this.fetchWord(); // get a new word for recognizing
  }

  addToVerbs(word: WordType): void {
    this.wordsService.addVerb(word);
    this.fetchWord(); // get a new word for recognizing
  }

  private fetchWord(): void {
    this.word = this.words.shift(); // shift() method is getting first element from the list and removes them,
  }


}
