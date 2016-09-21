import * as moment from 'moment';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs';

import {Message} from './Message';

const BUFFER_SIZE:number = 999;

export interface IIncomingTopic
{
    topicId?:string;
    name:string;
    isActive:boolean;
    createdBy?:string;
    createdAt?:moment.MomentStatic;
    updatedBy?:string;
    updatedAt?:moment.MomentStatic;
}

export class Topic
{
    topicId:string = '';
    name:string = '';
    isActive:boolean = false;
    createdBy:string = '';
    createdAt:moment.MomentStatic = null;
    updatedBy:string = '';
    updatedAt:moment.MomentStatic = null;
    messages:BehaviorSubject<Array<Message>> = new BehaviorSubject<Array<Message>>([]);

    constructor(data:IIncomingTopic)
    {
        for(let key in data)
        {
            this[key] = data[key];
        }
    }

    addMessage(message:Message):BehaviorSubject<Array<Message>>
    {
        let messages:Array<Message> = this.messages.getValue();
        messages.push(message);

        this.messages.next(messages);

        return this.messages;
    }

    mergeMessages(incomingMessages:Array<Message>):BehaviorSubject<Array<Message>>
    {
        let existingMesssages:Array<Message> = this.messages.getValue();
        let mergedMessages:Array<Message> = _.unionBy(incomingMessages, existingMesssages, 'messageId');

        this.messages.next(mergedMessages);

        return this.messages;
    }
}