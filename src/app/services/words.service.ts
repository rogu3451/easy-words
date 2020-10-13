import {Injectable} from '@angular/core';
import {Type, WordType} from '../data/models';
import {WORDS} from '../data/data-base';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  private words = new BehaviorSubject<WordType[]>([]); // words for learning
  private nouns = new Subject<WordType>(); // words signed as nouns
  private verbs = new Subject<WordType>(); // words signed as verbs


  constructor() {
    setTimeout(() => {
      this.words.next(WORDS);
    }, 2000);
  }

  getWords(): BehaviorSubject<WordType[]>{
    return this.words;
  }

  getNouns(): Observable<WordType>{
    return this.nouns.asObservable().pipe(
      map(word => {
        word.correct = word.type === Type.NOUN;
        return word;
      })
    );
  }

  getVerbs(): Observable<WordType> {
    return this.verbs.asObservable().pipe(
      map(word => {
        word.correct = word.type === Type.VERB;
        return word;
      })
    );
  }

  addNoun(value: WordType): void{
    this.nouns.next(value);
  }

  addVerb(value: WordType): void{
    this.verbs.next(value);
  }

}
