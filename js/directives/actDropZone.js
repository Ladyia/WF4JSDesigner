'use strict';

app.directive('actDropZone', function(wfPartDefinitions, wfGraphManipulator, designerUI) {
    return {
        restrict: 'A',
        templateUrl: './js/templates/actDropZone.html',
        scope: {
            actDropZone: '=',
            index: '=',
            parent: '='
        }, link: function(scope, element, attrs, ctrl) {

            if (scope.parent === undefined) {
                throw "actDropZone: must set parent attribute to an activity or null";
            }

            function addActivity (activityType) {
                var activity = wfPartDefinitions.createModel(scope.parent, activityType);

                if(scope.actDropZone instanceof Array) {
                    wfGraphManipulator.insertActivityAtPos(activity,
                        scope.actDropZone,
                            scope.index+1);
                } else {
                    scope.actDropZone = activity;
                }
                designerUI.selectedItem = activity;
            }

            element.droppable({
                accept: ".activity-tool",
                drop: function( event, ui ) {
                    scope.$apply(addActivity(ui.draggable.attr('data-type')));
                }
            });
        }
    };
});
