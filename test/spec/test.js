/* global describe, it */

(function () {
    'use strict';

    describe('Create a todo list', function () {
        describe('todo items', function () {
            it('should render to the DOM', function () {
                this.view = new BaseView();
                this.view.render();
                expect($('ul').length).equal(1);
            });
        });
    });
})();
s
